// app/page.tsx
'use client'
import { useState } from 'react'
import { Globe, Search, Info } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Home() {
  const [month, setMonth] = useState(months[0])
  const [day, setDay] = useState(1)
  const [year, setYear] = useState(2000)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${month}/${day}/${year}`
      )
      const data = await response.json()
      setEvents(data.events)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#1A1B1E] text-cyan-50">
      <nav className="border-b border-cyan-900/50 bg-[#111213] shadow-lg shadow-cyan-900/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Historia
            </span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <Info className="h-4 w-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card className="border-cyan-900/50 bg-[#111213] shadow-cyan-900/20">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select onValueChange={setMonth} defaultValue={month}>
                    <SelectTrigger>
                      <SelectValue>{month}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={day}
                    onChange={(e) => setDay(parseInt(e.target.value))}
                    placeholder="Day"
                    className="bg-[#1A1B1E]"
                  />
                  <Input
                    type="number"
                    min="1"
                    max="9999"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    placeholder="Year"
                    className="bg-[#1A1B1E]"
                  />
                </div>
                <Button
                  className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700"
                  onClick={fetchEvents}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Explore History'}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {events.map((event, index) => (
                <Card key={index} className="border-cyan-900/50 bg-[#111213] shadow-cyan-900/20">
                  <CardContent className="p-4">
                    <p className="text-cyan-50">{event.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="border-cyan-900/50 bg-[#111213] shadow-cyan-900/20">
              <CardHeader>
                <CardTitle>About Historia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>Time flows forward, but knowledge flows in all directions. Explore the echoes of history in the historical database.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-cyan-900/50 bg-[#1A1B1E] shadow-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Tactical Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Temporal Event Analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Global Intelligence Network
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Verified Historical Records
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-cyan-900/50 bg-[#1A1B1E] shadow-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Operation Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Select target date parameters
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Initialize temporal scan
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-cyan-400 rounded-full" />
                          Review historical data output
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// app/api/events/[month]/[day]/[year]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { month: string; day: string; year: string } }
) {
  const { month, day, year } = params

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/date/${month}/${day}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}