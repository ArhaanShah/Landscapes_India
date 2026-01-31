
// Import cover images
import aneriCover from '../content/projects/aneri/an1_lg.jpg';
import arpanCover from '../content/projects/arpanbhai/ap1_lg.jpg';
import kadambariCover from '../content/projects/kadambari/k1_lg.jpg';
import ramvatikaCover from '../content/projects/ramvatika/rv1_lg.JPG';
import jaybaugCover from '../content/projects/jay_baug/j1_lg.jpg';
import tejCover from '../content/projects/tej/t1_lg.jpg';
import arvindCover from '../content/projects/arvind_uplands/av1_lg.jpg';

export interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    category: string;
}

export const projects: Project[] = [
    {
        id: 'aneri',
        title: 'Aneri',
        description: 'A serene residential landscape focusing on minimal interventions and maximum impact.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: aneriCover,
        category: 'Residential',
    },
    {
        id: 'arpanbhai',
        title: 'Arpanbhai Residence',
        description: 'A lush, tropical-inspired garden designed to provide a private oasis in the city.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: arpanCover,
        category: 'Residential',
    },
    {
        id: 'kadambari',
        title: 'Kadambari',
        description: 'Blending traditional aesthetics with modern functionality for a seamless outdoor experience.',
        location: 'Gandhinagar, Gujarat',
        imageUrl: kadambariCover,
        category: 'Residential',
    },
    {
        id: 'ramvatika',
        title: 'Ramvatika',
        description: 'An expansive landscape project highlighting native flora and sustainable practices.',
        location: 'Mehsana, Gujarat',
        imageUrl: ramvatikaCover,
        category: 'Farmhouse',
    },
    {
        id: 'jay_baug',
        title: 'Jay Baug',
        description: 'A meticulously crafted garden space that serves as a perfect retreat for relaxation.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: jaybaugCover,
        category: 'Farmhouse',
    },
    {
        id: 'tej',
        title: 'Tej Residence',
        description: 'Contemporary landscape design emphasizing clean lines and structured planting.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: tejCover,
        category: 'Residential',
    },
    {
        id: 'arvind_uplands',
        title: 'Arvind Uplands',
        description: 'Luxury villa landscapes integrated with the natural topography of the surroundings.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: arvindCover,
        category: 'Commercial',
    },
];
