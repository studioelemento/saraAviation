import { newsArticles } from '../data/newsData';
import { coursesData } from '../data/coursesData';
import { fallbackGalleryImages } from '../data/galleryData';
import { fallbackTeamMembers } from '../data/teamData';
import { fallbackJobOpenings } from '../data/jobsData';

const bundledContent = {
  news: newsArticles.map(({ date, image, ...row }) => ({ ...row, date_label: date, image_url: image })),
  courses: coursesData.map(({ image, whatYouCanLearn, isGovt, ...row }) => ({
    ...row, image_url: image, what_you_can_learn: whatYouCanLearn, is_govt: isGovt,
  })),
  gallery: fallbackGalleryImages.map(({ url, ...row }) => ({ ...row, image_url: url })),
  team: fallbackTeamMembers.map(({ image, ...row }) => ({ ...row, image_url: image })),
  jobs: fallbackJobOpenings,
};

export function getBundledAdminRows(table) {
  return (bundledContent[table] || []).map((row, sort_order) => ({
    ...row, id: row.id ?? 'bundled-' + sort_order, published: true, sort_order, bundled: true,
  }));
}
