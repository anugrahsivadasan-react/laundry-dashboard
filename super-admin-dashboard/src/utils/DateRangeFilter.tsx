import { useState, useEffect, useRef } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface Props {
  onChange: (from: string, to: string) => void
}

const DateRangeFilter: React.FC<Props> = ({ onChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null) // ✅ reference

  const today = new Date()

  //  Default = last 7 days
  const start = new Date()
  start.setDate(today.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const [showPicker, setShowPicker] = useState(false)

  const [range, setRange] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ])

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd")

  //  Initial call
  useEffect(() => {
    onChange(formatDate(start), formatDate(end))
  }, [])

  const handleChange = (item: any) => {
    const newRange = item.selection
    setRange([newRange])

    onChange(formatDate(newRange.startDate), formatDate(newRange.endDate))
  }

  //  CLICK OUTSIDE HANDLER
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        className="bg-[#111] px-4 py-2 rounded-xl cursor-pointer border border-gray-700 text-sm text-white"
      >
        {format(range[0].startDate, "MMM d")} -{" "}
        {format(range[0].endDate, "MMM d, yyyy")}
      </div>

      {showPicker && (
        <div className="absolute top-12 right-0 z-50 shadow-lg">
          <DateRange
            ranges={range}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            maxDate={today}
          />
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter
