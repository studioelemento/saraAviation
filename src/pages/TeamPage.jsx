import { Link } from 'react-router-dom';
import { mapTeamRow } from '../lib/contentApi';
import { usePublishedContent } from '../hooks/usePublishedContent';

function TeamMember({ member }) {
  const initials = member.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="grid h-full place-items-center bg-gradient-to-br from-primary to-primary/80 text-5xl font-black text-white">
            {initials}
          </div>
        )}
        {member.experience && (
          <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">
            {member.experience}
          </span>
        )}
      </div>
      <div className="p-6 sm:p-7">
        <h2 className="text-xl font-bold leading-tight text-primary">{member.name}</h2>
        {member.role && <p className="mt-2 text-sm font-semibold text-primary/80">{member.role}</p>}
        {member.bio && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-600">{member.bio}</p>}
      </div>
    </article>
  );
}

export default function TeamPage() {
  const { items: teamMembers, loading } = usePublishedContent('team', mapTeamRow);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-primary px-6 pb-20 pt-44 text-center text-white md:pb-28 md:pt-56">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight md:text-7xl">
            Our <span className="text-accent">Team</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-xl">
            Meet the people who lead, teach, and support students at Sara Aviation Institute.
          </p>
        </div>
      </section>

      <section aria-label="Team members" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20">
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {teamMembers.map((member) => <TeamMember key={member.id} member={member} />)}
          </div>
        ) : (
          <p role="status" className="py-6 text-center text-gray-600">
            {loading ? 'Loading team profiles…' : 'Team profiles are currently unavailable.'}
          </p>
        )}
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-6 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">Interested in joining our team?</h2>
        <Link to="/careers" className="mt-5 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-primary/90">
          View open roles
        </Link>
      </section>
    </div>
  );
}
