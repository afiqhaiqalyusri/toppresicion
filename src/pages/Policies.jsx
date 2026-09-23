import React from 'react';
import PageHero from '../components/PageHero';
import { policies } from '../content';

export default function Policies() {
  return (
    <main className="page-main">
      <PageHero data={{
        image: 'img/cap-quality.jpg',
        title: 'Company <span class="accent">Policies</span>',
        breadcrumb: 'Company Policies'
      }} />

      <section className="page-content" style={{ padding: '80px 0 100px', background: 'var(--bg-2, #f8f9fa)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <span className="section-tag">Corporate Governance</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>Corporate <span className="accent">Policies</span></h2>
            <p className="intro-text" style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>At Top Precision, our policies are the foundation of our operational excellence. We are firmly committed to upholding the highest standards of product quality, environmental stewardship, data security, and ethical business practices across our entire supply chain.</p>
          </div>
          
          <div className="policy-grid">
            {policies && policies.length > 0 && policies.map((policy, index) => {
              const delayClass = index % 5 === 1 ? 'reveal-d1' : (index % 5 === 2 ? 'reveal-d2' : (index % 5 === 3 ? 'reveal-d3' : (index % 5 === 4 ? 'reveal-d4' : '')));
              return (
                <div key={index} className={`policy-card reveal ${delayClass}`}>
                  <div className="policy-card-header">TOP PRECISION</div>
                  <div className="policy-card-body">
                    <div className="policy-card-title">{policy.title || ''}</div>
                    <p dangerouslySetInnerHTML={{ __html: policy.body || '' }}></p>
                  </div>
                  <div className="policy-card-footer">Reference: {(policy.id || '').toUpperCase()}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
