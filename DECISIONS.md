# TRACE — Engineering Decisions

## 1. Why this approach

I chose Part 2 and designed TRACE as a fictional project-context product rather than redesigning an existing product.

This gave me control over the product narrative while allowing the homepage to directly demonstrate the challenge requirements: a clear value proposition, a real product interface, meaningful interaction, responsive behavior, and restrained motion.

I deliberately avoided conventional SaaS landing-page patterns such as fabricated testimonials, fake usage numbers, customer logos, gradients, glassmorphism, and generic feature grids.

The visual system instead relies on typography, spacing, thin borders, a restrained amber accent, and a product interface implemented directly in React.

The product visualization is interactive rather than a static screenshot: selecting timeline events changes the associated context and metadata.

## 2. Trade-off

The main trade-off was implementing TRACE as a frontend-only concept with static demonstration data rather than building a backend or realistic data layer.

This allowed more time to focus on responsive behavior, interaction quality, accessibility, visual hierarchy, and polish within the challenge time limit.

With a full week, I would introduce a typed event schema and real data layer, add automated end-to-end tests, and further validate the product interaction model.

I also chose JavaScript rather than TypeScript to optimize implementation speed during the timeboxed challenge. For a production codebase, I would migrate the event model and component interfaces to TypeScript.

## 3. AI usage

AI tools were used extensively during implementation for React/Vite scaffolding, component generation, Tailwind structure, animation implementation, mock data, and iterative code review.

I did not treat generated output as final. I directed the product concept and visual direction, reviewed the generated implementation, tested responsive behavior, inspected accessibility, identified implementation issues, and iterated on the result.

The final direction intentionally rejects common generated landing-page patterns such as excessive cards, decorative gradients, fabricated social proof, and unnecessary animation.

I personally verified the production build, responsive behavior, interaction states, keyboard behavior, reduced-motion behavior, and the hidden TRACEBACK MODE Easter egg.
