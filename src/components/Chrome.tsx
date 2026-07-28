/** Film grain + vignette laid over everything, for a printed-matter feel. */
export default function Chrome() {
  return (
    <div className="chrome" aria-hidden="true">
      <div className="chrome-grain" />
      <div className="chrome-vignette" />
    </div>
  )
}
