import React, { useState, useEffect } from 'react';
import OpenAIApi from 'openai';
import './OpenAi.css';

function OpenAi() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const placeholders = [
    "Recruitment software, performance management...",
    "Task management, project management...",
    "Sales automation, inventory management...",
    "Time tracking, accounting and finance..."
  ];

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [keyword, setKeyword] = useState('');

  const apiKey = "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";
  const openai = new OpenAIApi({ apiKey, dangerouslyAllowBrowser: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [placeholders]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedIdeas = await generateIdeas(keyword);
      setIdeas(generatedIdeas);
    } catch (error) {
      console.error('Error generating ideas:', error);
      setError('Error generating ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateIdeas = async (keyword) => {
    const prompt = `Generate SaaS ideas based on the keyword: ${keyword}.`;
    const options = {
      model: 'text-davinci',
      prompt: prompt,
      max_tokens: 200,
      n: 3,
    };

    const { data } = await openai.completions.create(options);
    return data.choices.map(choice => choice.text.trim());
  };

  return (
    <div className="saas-generator">
      <h2>Generate your SaaS ideas using ChatGPT!</h2>
      <p className="description">SaaS idea generator powered by AI. Input a keyword and get personalized SaaS ideas.</p>
      <hr />
      <div className="input-container">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder={placeholders[currentPlaceholderIndex]}
        />
        <button onClick={handleGenerateIdeas} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="ideas-container">
        {ideas.map((idea, index) => (
          <div key={index} className="idea">
            <p>{idea}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpenAi;
