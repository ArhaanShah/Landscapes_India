
// Import cover images
import aneriCover from '../content/projects/aneri/an1_lg.jpg';
import arpanCover from '../content/projects/arpanbhai/ap1_lg.jpg';
import kadambariCover from '../content/projects/kadambari/k1_lg.jpg';
import ramvatikaCover from '../content/projects/ramvatika/rv1_lg.JPG';
import jaybaugCover from '../content/projects/jay_baug/j1_lg.jpg';
import tejCover from '../content/projects/tej/t1_lg.jpg';
import arvindCover from '../content/projects/arvind_uplands/av1_lg.jpg';

// Import gallery images for Aneri
import aneri1 from '../content/projects/aneri/an1_lg.jpg';
import aneri2 from '../content/projects/aneri/an2_lg.jpg';
import aneri3 from '../content/projects/aneri/an3_lg.jpg';

// Import gallery images for Arpanbhai
import arpan1 from '../content/projects/arpanbhai/ap1_lg.jpg';
import arpan2 from '../content/projects/arpanbhai/ap2_lg.jpg';
import arpan3 from '../content/projects/arpanbhai/ap3_lg.jpg';
import arpan4 from '../content/projects/arpanbhai/ap4_lg.jpg';
import arpan5 from '../content/projects/arpanbhai/ap5_lg.jpg';

// Import gallery images for Kadambari
import kadambari1 from '../content/projects/kadambari/k1_lg.jpg';
import kadambari2 from '../content/projects/kadambari/k2_lg.jpg';
import kadambari3 from '../content/projects/kadambari/k3_lg.jpg';
import kadambari4 from '../content/projects/kadambari/k4_lg.jpg';

// Import gallery images for Ramvatika
import ramvatika1 from '../content/projects/ramvatika/rv1_lg.JPG';
import ramvatika2 from '../content/projects/ramvatika/rv2_lg.JPG';
import ramvatika3 from '../content/projects/ramvatika/rv3_lg.jpg';
import ramvatika4 from '../content/projects/ramvatika/rv4_lg.jpg';
import ramvatika5 from '../content/projects/ramvatika/rv5_lg.jpg';
import ramvatika6 from '../content/projects/ramvatika/rv6_lg.jpg';
import ramvatika7 from '../content/projects/ramvatika/rv7_lg.jpg';
import ramvatika8 from '../content/projects/ramvatika/rv8_lg.jpg';

// Import gallery images for Jay Baug
import jaybaug1 from '../content/projects/jay_baug/j1_lg.jpg';
import jaybaug2 from '../content/projects/jay_baug/j2_lg.jpg';
import jaybaug3 from '../content/projects/jay_baug/j3_lg.jpg';
import jaybaug4 from '../content/projects/jay_baug/j4_lg.jpg';
import jaybaug5 from '../content/projects/jay_baug/j5_lg.jpg';
import jaybaug6 from '../content/projects/jay_baug/j6_lg.jpg';
import jaybaug7 from '../content/projects/jay_baug/j7_lg.jpg';

// Import gallery images for Tej
import tej1 from '../content/projects/tej/t1_lg.jpg';
import tej2 from '../content/projects/tej/t2_lg.jpg';
import tej3 from '../content/projects/tej/t3_lg.jpg';
import tej4 from '../content/projects/tej/t4_lg.jpg';
import tej5 from '../content/projects/tej/t5_lg.jpg';
import tej6 from '../content/projects/tej/t6_lg.jpg';
import tej7 from '../content/projects/tej/t7_lg.jpg';
import tej8 from '../content/projects/tej/t8_lg.jpg';

// Import gallery images for Arvind Uplands
import arvind1 from '../content/projects/arvind_uplands/av1_lg.jpg';
import arvind2 from '../content/projects/arvind_uplands/av2_lg.jpg';
import arvind3 from '../content/projects/arvind_uplands/av3_lg.jpg';

export interface GalleryImage {
    src: string;
    alt: string;
    span?: 'col-span-1' | 'col-span-2' | 'row-span-2'; // For masonry-like layouts
}

export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription?: string; // For project details page
    location: string;
    imageUrl: string;
    category: string;
    galleryImages: GalleryImage[];
    year?: string;
    area?: string;
    clientType?: string;
}

export const projects: Project[] = [
    {
        id: 'aneri',
        title: 'Aneri',
        description: 'A serene residential landscape focusing on minimal interventions and maximum impact.',
        fullDescription: 'Aneri represents our philosophy of minimal design with maximum emotional impact. By focusing on the essentials and allowing breathing room for nature, we created a sanctuary where simplicity speaks volumes. Each element is carefully curated to evoke tranquility.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: aneriCover,
        category: 'Residential',
        year: '2022',
        area: '2,500 sq.ft',
        clientType: 'Private Residence',
        galleryImages: [
            { src: aneri1, alt: 'Aneri landscape view 1' },
            { src: aneri2, alt: 'Aneri landscape view 2' },
            { src: aneri3, alt: 'Aneri landscape view 3' },
        ],
    },
    {
        id: 'arpanbhai',
        title: 'Arpanbhai Residence',
        description: 'A lush, tropical-inspired garden designed to provide a private oasis in the city.',
        fullDescription: 'Arpanbhai Residence is an escape from urban noise, a carefully orchestrated tropical paradise within city limits. Lush plantings, natural water features, and sophisticated hardscaping create multiple intimate zones for relaxation and entertainment.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: arpanCover,
        category: 'Residential',
        year: '2021',
        area: '4,200 sq.ft',
        clientType: 'Private Residence',
        galleryImages: [
            { src: arpan1, alt: 'Arpanbhai residence view 1' },
            { src: arpan2, alt: 'Arpanbhai residence view 2' },
            { src: arpan3, alt: 'Arpanbhai residence view 3' },
            { src: arpan4, alt: 'Arpanbhai residence view 4' },
            { src: arpan5, alt: 'Arpanbhai residence view 5' },
        ],
    },
    {
        id: 'kadambari',
        title: 'Kadambari',
        description: 'Blending traditional aesthetics with modern functionality for a seamless outdoor experience.',
        fullDescription: 'Kadambari is where heritage meets contemporary elegance. Traditional design principles are woven into modern spaces, creating a timeless landscape that honors the past while embracing the future. Every corner tells a story of thoughtful design.',
        location: 'Gandhinagar, Gujarat',
        imageUrl: kadambariCover,
        category: 'Residential',
        year: '2023',
        area: '3,800 sq.ft',
        clientType: 'Private Residence',
        galleryImages: [
            { src: kadambari1, alt: 'Kadambari landscape view 1' },
            { src: kadambari2, alt: 'Kadambari landscape view 2' },
            { src: kadambari3, alt: 'Kadambari landscape view 3' },
            { src: kadambari4, alt: 'Kadambari landscape view 4' },
        ],
    },
    {
        id: 'ramvatika',
        title: 'Ramvatika',
        description: 'An expansive landscape project highlighting native flora and sustainable practices.',
        fullDescription: 'Ramvatika showcases sustainable landscape design at its finest. Spanning across vast grounds, it demonstrates how native flora and eco-conscious practices can create an environmentally responsible yet stunning outdoor space.',
        location: 'Mehsana, Gujarat',
        imageUrl: ramvatikaCover,
        category: 'Farmhouse',
        year: '2022',
        area: '15,000 sq.ft',
        clientType: 'Private Farmhouse',
        galleryImages: [
            { src: ramvatika1, alt: 'Ramvatika landscape view 1' },
            { src: ramvatika2, alt: 'Ramvatika landscape view 2' },
            { src: ramvatika3, alt: 'Ramvatika landscape view 3' },
            { src: ramvatika4, alt: 'Ramvatika landscape view 4' },
            { src: ramvatika5, alt: 'Ramvatika landscape view 5' },
            { src: ramvatika6, alt: 'Ramvatika landscape view 6' },
            { src: ramvatika7, alt: 'Ramvatika landscape view 7' },
            { src: ramvatika8, alt: 'Ramvatika landscape view 8' },
        ],
    },
    {
        id: 'jay_baug',
        title: 'Jay Baug',
        description: 'A meticulously crafted garden space that serves as a perfect retreat for relaxation.',
        fullDescription: 'Jay Baug is a masterpiece of precision landscaping. Every element has been meticulously placed to create a harmonious environment that balances visual aesthetics with functional comfort, serving as the ultimate personal retreat.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: jaybaugCover,
        category: 'Farmhouse',
        year: '2023',
        area: '8,500 sq.ft',
        clientType: 'Private Farmhouse',
        galleryImages: [
            { src: jaybaug1, alt: 'Jay Baug garden view 1' },
            { src: jaybaug2, alt: 'Jay Baug garden view 2' },
            { src: jaybaug3, alt: 'Jay Baug garden view 3' },
            { src: jaybaug4, alt: 'Jay Baug garden view 4' },
            { src: jaybaug5, alt: 'Jay Baug garden view 5' },
            { src: jaybaug6, alt: 'Jay Baug garden view 6' },
            { src: jaybaug7, alt: 'Jay Baug garden view 7' },
        ],
    },
    {
        id: 'tej',
        title: 'Tej Residence',
        description: 'Contemporary landscape design emphasizing clean lines and structured planting.',
        fullDescription: 'Tej Residence exemplifies modern minimalist landscaping. With clean geometric lines, structured plantings, and thoughtful spatial planning, it creates a sophisticated outdoor environment that complements contemporary architecture.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: tejCover,
        category: 'Residential',
        year: '2021',
        area: '6,200 sq.ft',
        clientType: 'Private Residence',
        galleryImages: [
            { src: tej1, alt: 'Tej residence view 1' },
            { src: tej2, alt: 'Tej residence view 2' },
            { src: tej3, alt: 'Tej residence view 3' },
            { src: tej4, alt: 'Tej residence view 4' },
            { src: tej5, alt: 'Tej residence view 5' },
            { src: tej6, alt: 'Tej residence view 6' },
            { src: tej7, alt: 'Tej residence view 7' },
            { src: tej8, alt: 'Tej residence view 8' },
        ],
    },
    {
        id: 'arvind_uplands',
        title: 'Arvind Uplands',
        description: 'Luxury villa landscapes integrated with the natural topography of the surroundings.',
        fullDescription: 'Arvind Uplands is a luxury landscape experience where architecture and nature converge. By harmoniously integrating the landscape with the existing topography, we created an exclusive retreat that feels like a natural extension of the earth.',
        location: 'Ahmedabad, Gujarat',
        imageUrl: arvindCover,
        category: 'Commercial',
        year: '2023',
        area: '5,000 sq.ft',
        clientType: 'Luxury Villa Complex',
        galleryImages: [
            { src: arvind1, alt: 'Arvind Uplands view 1' },
            { src: arvind2, alt: 'Arvind Uplands view 2' },
            { src: arvind3, alt: 'Arvind Uplands view 3' },
        ],
    },
];
