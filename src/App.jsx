import { useEffect, useRef, useState } from 'react'
import logo from './assets/InFrameLogo.webp'
import heroVideo from './assets/HeroVid.mp4'
import './App.css'

const services = [
  {
    number: '01',
    title: 'Social Media Management',
    text: 'Consistent, strategic content across the platforms where your customers spend their time.',
    icon: 'calendar',
  },
  {
    number: '02',
    title: 'Content Creation',
    text: 'Custom graphics, captions, stories, reels, and short-form content built around your brand.',
    icon: 'spark',
  },
  {
    number: '03',
    title: 'Content Strategy',
    text: 'Every post has a purpose. We build content around your goals, audience, and business.',
    icon: 'target',
  },
  {
    number: '04',
    title: 'Community Management',
    text: 'Stay connected through comment monitoring, engagement, and basic message management.',
    icon: 'chat',
  },
  {
    number: '05',
    title: 'Social Media Setup',
    text: 'Get your profiles optimized and professionally presented from the start.',
    icon: 'profile',
  },
  {
    number: '06',
    title: 'Analytics & Reporting',
    text: "Understand what's working with straightforward monthly reporting and recommendations.",
    icon: 'chart',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '299',
    description: 'A polished, consistent foundation for a growing business.',
    features: [
      '2 social platforms',
      '8 posts / month',
      '4 story sets / month',
      'Captions + hashtags',
      'Basic graphic design',
      'Content scheduling',
      'Monthly performance report',
      'Basic engagement monitoring',
    ],
  },
  {
    name: 'Growth',
    price: '499',
    popular: true,
    description: 'More content, more connection, and a strategy built to grow.',
    features: [
      'Up to 3 social platforms',
      '12 posts / month',
      '8 story sets / month',
      '2 reels / month',
      'Captions + hashtags',
      'Custom graphics',
      'Content calendar',
      'Scheduling & publishing',
      'Community engagement',
      'Monthly analytics report',
      'Monthly strategy call',
    ],
  },
  {
    name: 'Premium',
    price: '799',
    description: 'Full-service content and hands-on community support.',
    features: [
      'Up to 4 social platforms',
      '16 posts / month',
      '12 story sets / month',
      '4–6 reels / month',
      'Custom graphics + captions',
      'Content calendar',
      'Scheduling & publishing',
      'Community management',
      'Comment / DM monitoring',
      'Monthly strategy meeting',
      'Detailed analytics',
      'Content strategy',
      'Competitor + trend research',
    ],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Tell us about your business',
    text: 'Share your brand, goals, audience, and what makes your business different.',
  },
  {
    number: '02',
    title: 'Build your strategy',
    text: 'We shape your content direction and map out a focused monthly plan.',
  },
  {
    number: '03',
    title: 'Create',
    text: 'We create the graphics, captions, stories, reels, and content you need.',
  },
  {
    number: '04',
    title: 'Approve & publish',
    text: 'You review everything first. Once approved, we schedule and publish.',
  },
  {
    number: '05',
    title: 'Measure & improve',
    text: 'We review performance and use the data to make the next month stronger.',
  },
]

const specialties = ['Strategy', 'Social', 'Content', 'Community', 'Growth']

const faqs = [
  {
    question: 'How many platforms can you manage?',
    answer:
      'Depending on your plan, we manage between two and four social platforms. We will help you focus on the channels that make the most sense for your audience.',
  },
  {
    question: 'Do I have to provide the content?',
    answer:
      'Not all of it. We create your graphics, write your captions, and can capture original photos and video through a local content session. We will ask you for business updates, offers, and any specific assets only you can provide.',
  },
  {
    question: 'Do you create the graphics?',
    answer:
      'Yes. Every plan includes branded graphic design, with more custom design support included in the Growth and Premium plans.',
  },
  {
    question: 'Do you create reels?',
    answer:
      'Yes. Reels are included in our Growth and Premium plans. Local content sessions can also give us a library of short-form clips to work from.',
  },
  {
    question: 'Can you manage Facebook and Instagram?',
    answer:
      'Absolutely. Facebook and Instagram are a natural pairing, and we can adapt content so it feels right on each platform rather than simply duplicating every post.',
  },
  {
    question: 'How does content approval work?',
    answer:
      'You receive your planned content before it goes live. You can review it, request reasonable edits, and approve it before we schedule anything.',
  },
  {
    question: 'Can I change my plan?',
    answer:
      'Yes. As your goals and content needs change, we can talk through the best plan for the next phase of your business.',
  },
  {
    question: 'Do you offer one-time social media setup?',
    answer:
      'Yes. We can optimize your profiles, polish your branding, and make sure the essentials are in place even if you are not ready for ongoing management.',
  },
]

function Icon({ name, size = 24 }) {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    spark: <><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"/><path d="m5 15-.8 2.2L2 18l2.2.8L5 21l.8-2.2L8 18l-2.2-.8L5 15ZM19 13l-.7 2.3L16 16l2.3.7L19 19l.7-2.3L22 16l-2.3-.7L19 13Z"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 10h8M8 14h5"/></>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0M19 4v4M17 6h4"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m3 7 6-4 6 7 6-5"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    play: <polygon points="8 5 19 12 8 19 8 5" />,
    pause: <><path d="M9 5v14M15 5v14"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    camera: <><path d="M14.5 5 13 3h-2L9.5 5H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Z"/><circle cx="12" cy="13" r="4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></>,
    heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>,
    facebook: <path d="M14 8h4V3h-4c-3.3 0-6 2.7-6 6v3H4v5h4v7h5v-7h4l1-5h-5V9c0-.6.4-1 1-1Z"/>,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function BrandLogo({ light = false }) {
  return (
    <span className={`brand-logo${light ? ' brand-logo--light' : ''}`}>
      <img src={logo} width="768" height="512" alt="In Frame Marketing — Put Your Brand in Focus" />
    </span>
  )
}

function ArrowLink({ href, children, inverse = false, onClick }) {
  return (
    <a className={`button button--arrow${inverse ? ' button--inverse' : ''}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span className="button__icon"><Icon name="arrow" size={18} /></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')
  const videoRef = useRef(null)

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeMenu)
    return () => window.removeEventListener('keydown', closeMenu)
  }, [])

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setVideoPlaying(true)
    } else {
      videoRef.current.pause()
      setVideoPlaying(false)
    }
  }

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    setFormStatus('submitting')
    setFormMessage('')

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const message = data?.errors?.map((error) => error.message).join(', ')
        throw new Error(message || 'Something went wrong. Please try again.')
      }

      form.reset()
      setFormStatus('success')
      setFormMessage('Thanks! Your message is in frame. We’ll be in touch soon.')
    } catch (error) {
      setFormStatus('error')
      setFormMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="header-logo" href="#home" aria-label="In Frame Marketing home" onClick={closeMenu}>
          <BrandLogo />
        </a>

        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <ArrowLink href="#contact" onClick={closeMenu}>Get started</ArrowLink>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="eyebrow reveal reveal--1"><span /> Your social presence, focused</div>
          <div className="hero__grid">
            <div className="hero__copy">
              <h1 className="reveal reveal--2">Put your brand<br /><em>in focus.</em></h1>
              <p className="hero__lede reveal reveal--3">
                Social media management and content designed to help your business get noticed, connect with customers, and grow.
              </p>
              <div className="hero__actions reveal reveal--4">
                <ArrowLink href="#contact">Get started</ArrowLink>
                <a className="text-link" href="#services">View services <Icon name="arrow" size={18} /></a>
              </div>
            </div>

            <div className="hero__media reveal reveal--3">
              <div className="hero__frame-mark" aria-hidden="true"><span /><span /><span /><span /></div>
              <video
                ref={videoRef}
                className="hero__video"
                src={heroVideo}
                poster="/hero-poster.jpg"
                preload="metadata"
                width="960"
                height="540"
                autoPlay
                muted
                loop
                playsInline
                aria-label="In Frame Marketing brand animation"
              >
                <track kind="captions" src="/hero-captions.vtt" srcLang="en" label="English" />
              </video>
              <button className="video-control" type="button" onClick={toggleVideo} aria-label={videoPlaying ? 'Pause brand animation' : 'Play brand animation'}>
                <Icon name={videoPlaying ? 'pause' : 'play'} size={16} />
              </button>
              <div className="hero__tag">
                <span className="hero__tag-dot" />
                Creative direction<br />with a clear purpose
              </div>
            </div>
          </div>

          <div className="hero__ticker" aria-label="Our specialties: Strategy, Social, Content, Community, and Growth">
            <div className="hero__ticker-label">
              <span className="ticker-focus" aria-hidden="true"><i /><i /><i /><i /></span>
              <span>Inside every frame</span>
            </div>
            <div className="hero__ticker-window">
              <div className="hero__ticker-track">
                {[0, 1].map((group) => (
                  <div className="hero__ticker-group" aria-hidden={group === 1} key={group}>
                    {specialties.map((specialty, index) => (
                      <span className="hero__ticker-item" key={specialty}>
                        <small>0{index + 1}</small>
                        {specialty}
                        <i />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="statement section" aria-labelledby="statement-title">
          <p className="section-kicker">The bigger picture</p>
          <div className="statement__grid">
            <h2 id="statement-title">Your business deserves more than <em>random posts.</em></h2>
            <div>
              <p>We create intentional social media content that reflects your brand, speaks to your customers, and keeps your business consistently in front of the people who matter.</p>
              <a className="text-link" href="#approach">See our approach <Icon name="arrow" size={18} /></a>
            </div>
          </div>
        </section>

        <section className="services section" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker section-kicker--light">What we do</p>
              <h2 id="services-title">Everything your brand needs to <em>show up well.</em></h2>
            </div>
            <p>Strategy-led social support, tailored to your business—not a one-size-fits-all content machine.</p>
          </div>

          <div className="services__grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card__top">
                  <span>{service.number}</span>
                  <span className="service-card__icon"><Icon name={service.icon} /></span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="plans section" id="plans" aria-labelledby="plans-title">
          <div className="plans__intro">
            <p className="section-kicker">Flexible support</p>
            <h2 id="plans-title">Simple plans.<br /><em>Serious presence.</em></h2>
            <p>Choose the level of support that fits where your business is now. Every plan is built with consistency and intention.</p>
          </div>

          <div className="plans__grid">
            {plans.map((plan) => (
              <article className={`plan-card${plan.popular ? ' plan-card--popular' : ''}`} key={plan.name}>
                {plan.popular && <span className="plan-card__badge">Most popular</span>}
                <p className="plan-card__name">{plan.name}</p>
                <div className="plan-card__price"><sup>$</sup>{plan.price}<small>/ month</small></div>
                <p className="plan-card__description">{plan.description}</p>
                <a className="plan-card__cta" href="#contact">
                  Get started <Icon name="arrow" size={18} />
                </a>
                <div className="plan-card__line" />
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><Icon name="check" size={16} /> {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="approach section" id="approach" aria-labelledby="approach-title">
          <div className="approach__visual" aria-label="A collection of branded social media content examples">
            <div className="social-card social-card--quote">
              <div className="social-card__meta"><span className="mini-avatar">IN</span><span>inframe.co<br /><small>Original content</small></span><Icon name="spark" size={18} /></div>
              <blockquote>Content that looks like <em>you</em>—only more focused.</blockquote>
              <div className="social-card__bottom"><span>♡</span><span>⌁</span><span>↗</span><span className="social-card__save">▢</span></div>
            </div>
            <div className="social-card social-card--metric">
              <p>Monthly reach</p>
              <strong>+38.4%</strong>
              <div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              <span>Content that connects<br />creates momentum.</span>
            </div>
            <div className="phone-card">
              <div className="phone-card__bar"><span>9:41</span><i /></div>
              <div className="phone-card__story-head"><span className="story-avatar">IN</span><b>inframe.co</b><span>•••</span></div>
              <div className="phone-card__canvas">
                <span className="corner corner--tl" /><span className="corner corner--tr" /><span className="corner corner--bl" /><span className="corner corner--br" />
                <p>Make<br />them<br /><em>stop.</em></p>
                <span className="phone-card__label">STRATEGY / STORY / SOCIAL</span>
              </div>
              <div className="phone-card__reply">Send message <span>♡</span></div>
            </div>
            <div className="social-card social-card--palette">
              <span>BRAND / 002</span>
              <div><i /><i /><i /></div>
              <strong>Your colors.<br />Your voice.</strong>
            </div>
          </div>

          <div className="approach__copy">
            <p className="section-kicker">Content with intention</p>
            <h2 id="approach-title">Your brand.<br />Your story.<br /><em>Your content.</em></h2>
            <p>We don’t make random social posts. We create content around your brand, goals, customers, products, services, promotions, and personality.</p>
            <ul className="approach__list">
              <li><span>01</span>Distinctly on-brand</li>
              <li><span>02</span>Designed for your audience</li>
              <li><span>03</span>Connected to real goals</li>
            </ul>
            <ArrowLink href="#contact">Build my content</ArrowLink>
          </div>
        </section>

        <section className="process section" id="process" aria-labelledby="process-title">
          <div className="process__heading">
            <p className="section-kicker">From idea to impact</p>
            <h2 id="process-title">How it <em>works.</em></h2>
            <p>A simple, collaborative process that keeps you informed—without keeping social media on your to-do list.</p>
          </div>
          <div className="process__steps">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.number}>
                <div className="process-step__number">
                  <span>{step.number}</span>
                  {index < processSteps.length - 1 && <i />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <div className="about__feature">
            <div className="about__frame">
              <span className="corner corner--tl" /><span className="corner corner--tr" /><span className="corner corner--bl" /><span className="corner corner--br" />
              <span className="about__small">The people<br />behind the posts.</span>
              <div className="about__monogram">IN</div>
              <span className="about__caption">Small business deserves<br />big-brand intention.</span>
            </div>
            <div className="about__note">
              <Icon name="heart" size={20} />
              <span>Personal service.<br />Genuine relationships.</span>
            </div>
          </div>

          <div className="about__copy">
            <p className="section-kicker">Behind the brand</p>
            <h2 id="about-title">Marketing should feel <em>personal.</em></h2>
            <p className="about__lead">In Frame Marketing works closely with small businesses to create a social presence that feels true, consistent, and worth paying attention to.</p>
            <p>We take the time to understand your business, your people, and the goals behind every post. You get a creative partner who knows your brand—not a massive agency passing your account from desk to desk.</p>
            <div className="about__values">
              <span>01 / Personalized</span>
              <span>02 / Creative</span>
              <span>03 / Consistent</span>
              <span>04 / Strategic</span>
            </div>
          </div>
        </section>

        <section className="session section" aria-labelledby="session-title">
          <div className="session__topline"><span>Local content sessions</span><span>Photos + video + weeks of content</span></div>
          <div className="session__grid">
            <div>
              <p className="section-kicker section-kicker--light">Need content too?</p>
              <h2 id="session-title">One session.<br /><em>Weeks of content.</em></h2>
            </div>
            <div className="session__copy">
              <p>Give us a few hours with your business and we’ll capture photos and short-form video that can fuel your social media content for weeks.</p>
              <ul>
                <li><Icon name="clock" size={20} /><span><strong>1–2 hours</strong> on location</span></li>
                <li><Icon name="camera" size={20} /><span><strong>Photos + video</strong> tailored to your brand</span></li>
                <li><Icon name="folder" size={20} /><span><strong>Organized content</strong> ready for future posts</span></li>
              </ul>
              <ArrowLink href="#contact" inverse>Book a content session</ArrowLink>
            </div>
          </div>
        </section>

        <section className="faq section" aria-labelledby="faq-title">
          <div className="faq__heading">
            <p className="section-kicker">Good to know</p>
            <h2 id="faq-title">Questions,<br /><em>answered.</em></h2>
            <p>Still wondering about something?</p>
            <a className="text-link" href="mailto:hello@inframemarketing.com">Let’s talk <Icon name="arrow" size={18} /></a>
          </div>
          <div className="faq__list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>{faq.question}</span><i /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div className="contact__mark" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="contact__content">
            <div className="contact__intro">
              <p className="section-kicker section-kicker--light">Your next move</p>
              <h2 id="contact-title">Ready to put your<br />brand <em>in focus?</em></h2>
              <p>Tell us a little about your business and what you need. We’ll follow up to talk through the right next step.</p>
              <div className="contact__availability"><i /> Now accepting new clients</div>
            </div>

            <form
              className="contact-form"
              action="https://formspree.io/f/xvkzvzwv"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="New In Frame Marketing inquiry" />

              <div className="contact-form__row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" placeholder="you@business.com" required />
                </label>
              </div>

              <div className="contact-form__row">
                <label>
                  <span>Business</span>
                  <input type="text" name="business" autoComplete="organization" placeholder="Business name" />
                </label>
                <label>
                  <span>Interested in</span>
                  <select name="service" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>Social media management</option>
                    <option>Content creation</option>
                    <option>Content strategy</option>
                    <option>Local content session</option>
                    <option>Social media setup</option>
                    <option>Something else</option>
                  </select>
                </label>
              </div>

              <label>
                <span>How can we help?</span>
                <textarea name="message" rows="5" placeholder="Tell us about your goals, challenges, or the support you’re looking for." required />
              </label>

              <button className="contact__button" type="submit" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Sending…' : 'Send inquiry'}
                <Icon name="arrow" size={22} />
              </button>

              {formMessage && (
                <p className={`contact-form__status contact-form__status--${formStatus}`} role="status" aria-live="polite">
                  {formMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__main">
          <div className="footer__brand">
            <a href="#home" aria-label="In Frame Marketing home"><BrandLogo light /></a>
            <p>Creative social media management for small businesses ready to show up with purpose.</p>
          </div>
          <div className="footer__links">
            <div>
              <p>Explore</p>
              <a href="#services">Services</a>
              <a href="#plans">Plans</a>
              <a href="#process">Process</a>
              <a href="#about">About</a>
            </div>
            <div>
              <p>Connect</p>
              <a href="mailto:hello@inframemarketing.com">Email us</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
          <div className="footer__socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={20} /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" size={20} /></a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} In Frame Marketing</span>
          <span>Put Your Brand in Focus.</span>
          <div><a href="#privacy">Privacy policy</a><a href="#terms">Terms of service</a></div>
        </div>
      </footer>
    </div>
  )
}

export default App
