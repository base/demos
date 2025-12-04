export function getCartelTitle(rank: number | null, shares: number): string {
    if (!rank || shares <= 0) return "Associate";

    if (rank === 1) return "Boss of Bosses";
    if (rank <= 3) return "Caporegime";
    if (rank <= 10) return "Consigliere";
    if (rank <= 50) return "Made Man";

    return "Soldato";
}

export function getTitleTheme(title: string): { color: string, icon: string } {
    switch (title) {
        case "Boss of Bosses": return { color: "text-[#D4AF37]", icon: "👑" };
        case "Caporegime": return { color: "text-red-500", icon: "🩸" };
        case "Consigliere": return { color: "text-purple-400", icon: "📜" };
        case "Made Man": return { color: "text-blue-400", icon: "🔹" };
        case "Soldato": return { color: "text-zinc-400", icon: "⚔️" };
        default: return { color: "text-zinc-600", icon: "👤" };
    }
}
