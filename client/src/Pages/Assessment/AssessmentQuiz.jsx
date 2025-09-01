import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Link } from 'react-router-dom';

const AssessmentQuiz = () => {
  const [responses, setResponses] = useState({
    stress: 3,
    anxiety: 3,
    sleep: 3,
    mood: 3,
    energy: 3,
    coping: 3,
    optimism: 3
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    { id: 'stress', text: 'How would you rate your stress levels?', min: 1, max: 5 },
    { id: 'anxiety', text: 'How anxious have you felt recently?', min: 1, max: 5 },
    { id: 'sleep', text: 'Quality of sleep? (1 = poor, 5 = excellent)', min: 1, max: 5 },
    { id: 'mood', text: 'Overall mood assessment?', min: 1, max: 5 },
    { id: 'energy', text: 'Energy levels throughout the day?', min: 1, max: 5 },
    { id: 'coping', text: 'How well are you coping with challenges?', min: 1, max: 5 },
    { id: 'optimism', text: 'Level of optimism about the future?', min: 1, max: 5 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Based on these mental health survey responses (1-5 scale), calculate scores for stress, anxiety, and happiness (0-100 scale). Return ONLY valid JSON like {"stress": 75, "anxiety": 40, "happiness": 80}:\n\n${
      questions.map(q => `${q.text}: ${responses[q.id]}`).join('\n')
    }`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      const jsonMatch = responseText.match(/\{.*\}/s);
      if (jsonMatch) {
        setResults(JSON.parse(jsonMatch[0]));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: parseInt(value) }));
  };

  // Prepare data for MUI X Charts
  const chartData = results ? [
    { label: 'Stress', value: results.stress },
    { label: 'Anxiety', value: results.anxiety },
    { label: 'Happiness', value: results.happiness }
  ] : [];

  return (
    <div className="max-w-2xl mx-auto p-6 my-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Mental Health Assessment</h1>
      
      {!results ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="block text-gray-700">
                {q.text} ({responses[q.id]})
              </label>
              <input
                type="range"
                min={q.min}
                max={q.max}
                value={responses[q.id]}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low ({q.min})</span>
                <span>High ({q.max})</span>
              </div>
            </div>
          ))}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              'Get Assessment'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Assessment Results</h2>
          
          <div className="h-80">
            <BarChart
              xAxis={[{ scaleType: 'band', data: chartData.map(item => item.label) }]}
              series={[{ data: chartData.map(item => item.value) }]}
              colors={['#ef4444', '#f59e0b', '#10b981']}
              height={300}
            />
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            {chartData.map((item, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
                <p className="font-semibold">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}/100</p>
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center gap-4'>
          <button
            onClick={() => setResults(null)}
            className="mt-6 bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600"
          >
            Retake Assessment
          </button>
          <Link
            to='/experts'
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            Talk to an Expert
          </Link>
        </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentQuiz;