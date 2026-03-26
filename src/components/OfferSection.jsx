import './OfferSection.css';

export default function OffersSection() {
  return (
    <section className="offers-section">

      <p className="tag">What I can Offer You</p>
      <div className="offers-container">

        {/* WORKSHOP */}
        <div className="offer-block">
          <p className="offer-eyebrow">Workshop</p>

          <h2 className="offer-title">
            Where the Map Runs Out
          </h2>

          <p className="offer-subtitle">
            A workshop for teams navigating decisions at the edge
          </p>

          <div className="offer-body">
            <p>
              There's a moment in every organisation's story where the old playbook stops working. 
              This doesn't happen because bad decisions were made — it happens because the territory genuinely changed.
            </p>

            <p>
              Teams often feel this before they can name it. Experiences such as increased pressure and pace are common, 
              together with a sense that the current design isn't performing the way it once did. 
              Often, the very relatable instinct is to push harder, faster, or look sideways at what “everyone else” is doing.
            </p>

            <p>
              This workshop is a space to pause before deciding on the next move. It provides a framework to explore what's 
              happening under the surface and find the questions that fit your specific situation — before committing to an expensive answer.
            </p>
          </div>

          <div className="offer-outcome">
            <p className="offer-outcome-title">What it creates</p>
            <p>
              A shared language for what your team has been sensing, and the question you couldn't have asked when you walked in.
              With the right questions, clearer and more grounded decisions can be made.
            </p>
            <p>
              This workshop shows you the specific insight your team needs to step over the edge of your current map 
              and find a new dimension of leadership and growth.
            </p>
          </div>

          <button className="offer-button">
            Bring this to your team
          </button>
        </div>


        {/* 1:1 WORK */}
        <div className="offer-block">
          <p className="offer-eyebrow">1:1 Work</p>

          <h2 className="offer-title">
            Coaching for People at a Turning Point
          </h2>

          <div className="offer-body">
            <p>
              You're not short on options. What's harder to see is the pattern underneath them, 
              and why they keep producing the same result.
            </p>

            <p>
              I work with curious people who want to find out what else might be true about their life. 
              With greater awareness, new choices and potential are always guaranteed.
            </p>

            <p>
              I help you make sure that what you do with that gets you to a place you'd truly like to be.
            </p>
          </div>

          <div className="offer-outcome">
            <p className="offer-outcome-title">What becomes possible</p>
            <ul>
              <li>The language for what you've been sensing</li>
              <li>A clearer view of the patterns shaping your experiences</li>
              <li>A more grounded relationship with your direction</li>
              <li>Peace of mind and a greater sense of trust in your choices</li>
            </ul>
          </div>

          <button className="offer-button">
            Work with me
          </button>
        </div>

      </div>
    </section>
  );
}