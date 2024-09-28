import { useState } from 'react';


const LoremGenerator = () => {
  const [paragraphs, setParagraphs] = useState(1);
  const [loremText, setLoremText] = useState('');
  const [error, setError] = useState('');


  const generateLorem = async () => {
    setError(''); 
    try {
      const response = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLoremText(data.join('\n\n'));
    } catch (error) {
      console.error(error); 
      setError('Failed to generate Lorem Ipsum text. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Lorem Ipsum Generator</h1>
      <input
        type="number"
        min="1"
        value={paragraphs}
        onChange={(e) => setParagraphs(e.target.value)}
        className="border rounded-lg p-2 mb-4"
      />
      <button
        onClick={generateLorem}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Generate
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-6 w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
        <pre className="whitespace-pre-wrap">{loremText}</pre>
      </div>
    </div>
  );
};

export default LoremGenerator;
