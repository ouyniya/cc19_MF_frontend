import { create } from "zustand";
import axios from "axios";

const useRiskAssessmentStore = create((set) => ({
  riskQuiz: [],
  riskResult: [],
  myRiskResultForPort: [],
  score: null,
  getRiskQuiz: async () => {
    const res = await axios.get(
      `http://localhost:8000/risk-assessment/question`
    );
    // console.log('getRiskQuiz...',res);
    set({ riskQuiz: res.data });
  },
  saveScore: (score) => set({ score: score }),
  getRiskResult: async (userScore) => {
    const res = await axios.get(
      `http://localhost:8000/risk-assessment/result?score=${userScore}`
    );
    // console.log('getRiskQuiz...',res);
    set({ riskResult: res.data });
  },
  getRiskResultById: async (id) => {
    const res = await axios.get(
      `http://localhost:8000/risk-assessment/result-by-id?id=${id}`
    );
    // console.log('getRiskQuiz...',res);
    set({ myRiskResultForPort: res.data });
  },
  saveRiskResult: async (token, body) => {
    const res = await axios.post(
      `http://localhost:8000/user/risk-assessment`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
}));

export default useRiskAssessmentStore;
