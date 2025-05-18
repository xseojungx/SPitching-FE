type Segment = { label: string; count: number; color: string };

type Props = { title: string; total: number; segments: Segment[]; unit?: string };

export default function FluencyBar({ title, total, segments, unit = '회' }: Props) {
  return (
    <div className='w-full space-y-3'>
      {/* 제목 */}
      <p className='b1 font-semibold text-gray-900'>{title}</p>

      {/* 막대 그래프 */}
      <div className='relative flex h-3.5 w-full overflow-hidden rounded-full bg-[#ECEEEC]'>
        {segments.map((segment, idx) => {
          const width = (segment.count / total) * 100;

          return (
            <div
              key={idx}
              className={`h-full transition-all duration-300`}
              style={{
                width: `${width}%`,
                backgroundColor: segment.color,
                borderTopLeftRadius: idx === 0 ? '9999px' : 0,
                borderBottomLeftRadius: idx === 0 ? '9999px' : 0,
                borderTopRightRadius: idx === segments.length - 1 ? '9999px' : 0,
                borderBottomRightRadius: idx === segments.length - 1 ? '9999px' : 0,
              }}
            />
          );
        })}
      </div>

      {/* 레이블 + 값 */}
      <div className='flex flex-wrap justify-between text-xs text-gray-700'>
        {segments.map((segment, idx) => (
          <div
            key={idx}
            className='flex items-center space-x-1'
          >
            <span
              className='inline-block h-3 w-3 rounded-full'
              style={{ backgroundColor: segment.color }}
            />
            <span className='c2'>
              {segment.label} {segment.count}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
