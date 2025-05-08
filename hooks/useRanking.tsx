import { useState, useEffect } from "react";
import { getRanking, Ranking } from "../services/RankingService";

const useRanking = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateRanking = async () => {
    try {
      setLoading(true);
      const rankingList = await getRanking();;
      setRanking(rankingList);
      setError(null);
    } catch (err) {
      console.error("Error al obtener el ranking:", err);
      setError("No se pudo obtener el ranking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRanking();
  }, []);

  return { ranking, loading, error, updateRanking };
};


export default useRanking;
