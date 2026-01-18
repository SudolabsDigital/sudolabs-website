export const getDifficultyColor = (diff?: string) => {
  switch (diff) {
    case 'beginner':
      return "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20";
    case 'intermediate':
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20";
    case 'advanced':
      return "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getDifficultyLabel = (diff?: string) => {
  switch (diff) {
    case 'beginner':
      return "Principiante"; // Shortened for cards context if needed, but keeping full for now
    case 'intermediate':
      return "Intermedio";
    case 'advanced':
      return "Avanzado";
    default:
      return "";
  }
};
