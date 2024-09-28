
import{ useState, useEffect } from 'react';

const EducationPlanner = () => {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem('subjects');
    return savedSubjects ? JSON.parse(savedSubjects) : [];
  });
  const [subjectName, setSubjectName] = useState('');
  const [studyHours, setStudyHours] = useState(1);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (subjectName && studyHours > 0) {
      setSubjects([...subjects, { name: subjectName, hours: studyHours }]);
      setSubjectName('');
      setStudyHours(1);
    }
  };

  const adjustHours = (index, change) => {
    const newSubjects = [...subjects];
    newSubjects[index].hours = Math.max(1, newSubjects[index].hours + change);
    setSubjects(newSubjects);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Education Planner</h1>
      <div className="mb-4">
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Subject Name"
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          value={studyHours}
          onChange={(e) => setStudyHours(Number(e.target.value))}
          min="1"
          className="border p-2 rounded w-1/4 ml-2"
        />
        <button
          onClick={addSubject}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Add Subject
        </button>
      </div>

      <ul className="list-disc pl-5">
        {subjects.map((subject, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="mr-2">{subject.name} - {subject.hours} hours</span>
            <button
              onClick={() => adjustHours(index, 1)}
              className="bg-green-500 text-white p-1 rounded mr-1"
            >
              +
            </button>
            <button
              onClick={() => adjustHours(index, -1)}
              className="bg-red-500 text-white p-1 rounded"
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationPlanner;
