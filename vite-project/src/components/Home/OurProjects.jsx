const css = `
  .projects {
    padding: 42px 24px;
    background: #fff;
  }
  .projects__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .projects__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-bottom: 40px;
  }
  .projects__header::before,
  .projects__header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  .projects__title {
    font-size: 24px;
    font-weight: 900;
    color: #1a3a6b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    white-space: nowrap;
  }
  .projects__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
  .projects__card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #eaeaea;
    padding: 8px;
    transition: all 0.25s;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }
  .projects__card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.1);
    border-color: #2e7d32;
  }
  .projects__card-img {
    height: 130px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 16px;
    display: block;
    background: #f0f0f0;
  }
  .projects__card-body { 
    padding: 0 8px 12px; 
    text-align: left;
  }
  .projects__card-name {
    font-size: 14px;
    font-weight: 800;
    color: #1a3a6b;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .projects__card-desc {
    font-size: 11.5px;
    color: #555;
    margin: 0;
    line-height: 1.4;
  }
  @media (max-width: 1100px) {
    .projects__grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 560px) {
    .projects__grid { grid-template-columns: repeat(2, 1fr); }
    .projects__header::before, .projects__header::after { display: none; }
  }
`;

const projects = [
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80', name: 'Health Benefit Card', desc: 'Get discounts on treatment & medicines' },
  { img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80', name: 'Hospital Discount Program', desc: 'Get up to 50% discount at partner hospitals' },
  { img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80', name: 'Free Medicine Program', desc: 'Free medicines for needy people' },
  { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80', name: 'Medical Camps', desc: 'Free checkup & treatment camps' },
  { img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80', name: 'Women Healthcare', desc: "Special care for women's health" },
  { img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80', name: 'Digital Healthcare', desc: 'Technology driven health solutions' },
];

export default function OurProjects() {
  return (
    <>
      <style>{css}</style>
      <section className="projects">
        <div className="projects__container">
          <div className="projects__header">
            <h2 className="projects__title">Our Projects</h2>
          </div>
          <div className="projects__grid">
            {projects.map((p) => (
              <div key={p.name} className="projects__card">
                <img src={p.img} alt={p.name} className="projects__card-img" />
                <div className="projects__card-body">
                  <p className="projects__card-name">{p.name}</p>
                  <p className="projects__card-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
