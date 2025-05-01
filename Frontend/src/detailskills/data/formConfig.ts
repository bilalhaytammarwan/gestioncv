import { FieldSection } from '../types';

export const initialSections: FieldSection[] = [
  {
    id: 'skills',
    title: 'Skills',
    canAddMore: true,
    fields: [
      {
        id: 'skill_1',
        name: 'skill_1',
        label: 'Skill 1',
        type: 'text',
        required: false,
        placeholder: 'e.g., JavaScript, Project Management'
      },
      {
        id: 'skill_2',
        name: 'skill_2',
        label: 'Skill 2',
        type: 'text',
        required: false,
        placeholder: 'e.g., React, UI/UX Design'
      },
      {
        id: 'skill_3',
        name: 'skill_3',
        label: 'Skill 3',
        type: 'text',
        required: false,
        placeholder: 'e.g., Python, Data Analysis'
      }
    ]
  }
];