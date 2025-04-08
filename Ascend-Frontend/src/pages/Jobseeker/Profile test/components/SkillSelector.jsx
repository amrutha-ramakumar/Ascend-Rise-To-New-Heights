import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import BASE_URL from '../../../../api/BaseUrl'
const SkillSelector = ({ selectedSkills, onSkillSelect, onSkillRemove }) => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/skills`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }

        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Select skills...
      </button>
      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-200 rounded-t-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ul className="max-h-60 overflow-auto">
            {filteredSkills.map((skill) => (
              <li
                key={skill.skillId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (selectedSkills.find(s => s.skillId === skill.skillId)) {
                    onSkillRemove(skill.skillId);
                  } else {
                    onSkillSelect(skill);
                  }
                  setOpen(false);
                }}
              >
                {skill.skillName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
SkillSelector.propTypes = {
    selectedSkills: PropTypes.arrayOf(
      PropTypes.shape({
        skillId: PropTypes.number.isRequired,
        skillName: PropTypes.string.isRequired,
      })
    ).isRequired,
    onSkillSelect: PropTypes.func.isRequired,
    onSkillRemove: PropTypes.func.isRequired,
  };
export default SkillSelector;

