import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# =========================
# 1. Ler dados do formulário
# =========================

# Exemplo: arquivo exportado do Google Forms
df = pd.read_csv("respostas.csv")

# Ajuste os nomes conforme as colunas reais do seu formulário
sus_cols = [
    "Eu gostaria de usar este sistema com frequência ", 
    "Achei o sistema desnecessariamente complexo  ", 
    "Achei o sistema fácil de usar  ", 
    "Acho que precisaria de ajuda para usar este sistema  ", 
    "As funções estavam bem integradas  ",
    "Achei o sistema inconsistente  ", 
    "A maioria das pessoas aprenderia a usar rapidamente  ", 
    "Achei o sistema complicado de usar  ", 
    "Senti-me confiante ao usar o sistema  ", 
    "Precisei aprender muitas coisas antes de usar  "
]

# Garantir valores numéricos
df[sus_cols] = df[sus_cols].apply(pd.to_numeric, errors="coerce")


# =========================
# 2. Calcular score SUS
# =========================

def calculate_sus(row):
    score = 0

    for i, col in enumerate(sus_cols, start=1):
        value = row[col]

        if i % 2 == 1:
            # Itens positivos: resposta - 1
            score += value - 1
        else:
            # Itens negativos: 5 - resposta
            score += 5 - value

    return score * 2.5


df["SUS_score"] = df.apply(calculate_sus, axis=1)


# =========================
# 3. Estatísticas descritivas
# =========================

summary = {
    "n": df["SUS_score"].count(),
    "mean": df["SUS_score"].mean(),
    "median": df["SUS_score"].median(),
    "std": df["SUS_score"].std(),
    "min": df["SUS_score"].min(),
    "max": df["SUS_score"].max()
}

print("Resumo SUS")
for k, v in summary.items():
    print(f"{k}: {v:.2f}" if isinstance(v, float) else f"{k}: {v}")


# =========================
# 4. Classificação simples
# =========================

def classify_sus(score):
    if score >= 85:
        return "Excellent"
    elif score >= 70:
        return "Good"
    elif score >= 50:
        return "OK / Marginal"
    else:
        return "Poor"


df["SUS_class"] = df["SUS_score"].apply(classify_sus)

print("\nDistribuição por classe:")
print(df["SUS_class"].value_counts())


# =========================
# 5. Análise por questão
# =========================

item_means = df[sus_cols].mean()

# Rótulos curtos para o gráfico
item_labels = [f"Q{i}" for i in range(1, 11)]

print("\nMédia por item do SUS:")
for i, (col, val) in enumerate(item_means.items(), start=1):
    print(f"Item {i}: {val:.2f} - {col.strip()}")

plt.figure(figsize=(8, 4))
item_means.plot(kind="bar")
plt.xticks(ticks=range(10), labels=item_labels, rotation=0)
plt.ylabel("Mean response")
plt.xlabel("SUS item")
plt.title("Mean response by SUS item")
plt.tight_layout()
plt.savefig("sus_item_means.png", dpi=300)
plt.show()


# =========================
# 6. Histograma dos scores
# =========================

plt.figure(figsize=(7, 4))
plt.hist(df["SUS_score"], bins=10)
plt.axvline(68, linestyle="--", label="SUS average = 68")
plt.axvline(df["SUS_score"].mean(), linestyle="-", label="Observed mean")
plt.xlabel("SUS score")
plt.ylabel("Number of participants")
plt.title("Distribution of SUS scores")
plt.legend()
plt.tight_layout()
plt.savefig("sus_histogram.png", dpi=300)
plt.show()


# =========================
# 7. Boxplot
# =========================

plt.figure(figsize=(5, 4))
plt.boxplot(df["SUS_score"].dropna(), vert=True)
plt.ylabel("SUS score")
plt.title("SUS score distribution")
plt.tight_layout()
plt.savefig("sus_boxplot.png", dpi=300)
plt.show()


# =========================
# 8. Exportar resultados
# =========================

df.to_csv("sus_resultados_calculados.csv", index=False)

pd.DataFrame([summary]).to_csv("sus_resumo.csv", index=False)