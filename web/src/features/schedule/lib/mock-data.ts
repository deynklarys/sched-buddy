import { Subject } from '../types'

export const scheduleData: Subject[] = [
  {
    id: crypto.randomUUID(),
    title: 'Data Mining',
    color: '#FFE37D',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['monday'],
        startTime: 600,
        endTime: 720,
        instructor: 'Sy, C.',
        location: 'BUCS-101',
      },
      {
        id: crypto.randomUUID(),
        days: ['wednesday'],
        startTime: 780,
        endTime: 1140,
        type: 'Lab',
        instructor: 'Sy, C.',
        location: 'BUCS-215',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title:
      'Information Assurance and Security Information Assurance and Security',
    color: '#C8F7C5',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['tuesday'],
        startTime: 780,
        endTime: 900,
        instructor: 'Brogada, M.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Human Computer Interaction',
    color: '#E08283',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['tuesday'],
        startTime: 1020,
        endTime: 1140,
        type: 'Online Class',
        instructor: 'Canon, M.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Networks and Communications',
    color: '#99CCCC',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['monday'],
        startTime: 780,
        endTime: 960,
        type: 'Online Class',
        instructor: 'Brogada, M.',
      },
      {
        id: crypto.randomUUID(),
        days: ['thursday'],
        startTime: 780,
        endTime: 900,
        instructor: 'Brogada, M.',
        location: 'BUCS-320',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Science, Technology, and Society',
    color: '#CC99CC',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['thursday'],
        startTime: 540,
        endTime: 720,
        type: 'Lecture',
        instructor: 'Conda-Botin, K.',
        location: 'BUCS B4206',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Ethics',
    color: '#F7B891',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['thursday'],
        startTime: 1020,
        endTime: 1200,
        instructor: 'Orpano, J.',
        location: 'BU Chapel',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Software Engineering 2',
    color: '#FFDDFF',
    meetings: [
      {
        id: crypto.randomUUID(),
        days: ['friday'],
        startTime: 540,
        endTime: 720,
        instructor: 'Maceda, L.',
        location: 'BUCS-401',
      },
      {
        id: crypto.randomUUID(),
        days: ['friday'],
        startTime: 780,
        endTime: 1140,
        type: 'Lecture',
        instructor: 'Maceda, L.',
        location: 'BUCS-219',
      },
    ],
  },
]
