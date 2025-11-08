import Image from "next/image";
import DataStrategySection from "../components/DataStrategySection";
import { WhyChooseUs } from "../about/page";
import { ContactCTA } from "../about/page";
import { apiUrl } from '../../lib/api';

async function fetchProjects() {
  // Try common CMS ports: prefer 3001, fall back to 3000
  const url = apiUrl('/api/v1/projects?limit=100');
  try {
    const res = await fetch(url, { next: { revalidate: 120 } });
    console.log('[PROJECT LIST] Fetch:', url, 'status:', res.status);
    if (!res.ok) {
      console.error('[PROJECT LIST] Bad response', res.status, await res.text());
      return [];
    }
    const json = await res.json();
    if (!json || typeof json !== 'object') {
      console.error('[PROJECT LIST] Invalid JSON shape:', json);
      return [];
    }
    const items = json?.data?.items || [];
    console.log('[PROJECT LIST] Items length:', items.length);
    return items;
  } catch (e) {
    console.error('[PROJECT LIST] Network error', e);
    return [];
  }
}

function ProjectCard({ project }) {
  const href = project.liveUrl || project.repoUrl || `/projects/${project.slug}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-[28px] bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-gray-300 p-6 md:p-8 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      <div className="relative z-10">
        <div className="w-fit mb-5">
          <span className="inline-flex items-center rounded-full border-2 border-violet-300 bg-violet-50 text-violet-700 text-xs md:text-sm font-medium px-3 py-1.5 shadow-sm group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
            {project.tags?.[0] || 'Project'}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
          {project.description || 'No description provided.'}
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-md group-hover:border-gray-100 transition-all duration-300">
          <Image
            src={project.thumbnailUrl || '/assets/demo/cs1.webp'}
            alt={project.name}
            width={1200}
            height={700}
            className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            priority={false}
          />
        </div>
      </div>
    </a>
  );
}

export default async function WorkPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 text-center">
            <span className="block">Explore the Projects</span>
            <span className="block mt-2">We’ve Worked</span>
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="work-grid-top" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-20">No projects found.</div>
            ) : (
              projects.map((p) => <ProjectCard key={p._id || p.slug} project={p} />)
            )}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ContactCTA />
    </div>
  );
}
