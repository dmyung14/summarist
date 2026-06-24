interface StatisticsHeadingsProps {
  headings: string[]
  activeIndex: number
  className?: string
}

export default function StatisticsHeadings({ headings, activeIndex, className }: StatisticsHeadingsProps) {
  return (
    <div className={className}>
      {headings.map((heading, index) => (
        <div
          key={index}
          className="statistics__heading"
          style={{ color: index === activeIndex ? "#2bd97c" : undefined }}
        >
          {heading}
        </div>
      ))}
    </div>
  )
}
