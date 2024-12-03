import { v4 as uuidv4 } from 'uuid'

function generateEventId() {
  const uuid = uuidv4()
  return `${Date.now().toString()}-${uuid}`
}

const toPush: any[] = []

let completed = false
const cancelInterval = setInterval(() => {
  if (!window.fbq)
    return

  clearInterval(cancelInterval)

  setTimeout(() => {
    completed = true
    toPush.forEach((x) => {
      window.fbq('track', x.first, x.second || {}, x.third)
      fetch(
      `${import.meta.env.VITE_APP_PAGE_URL}/pixel?eventId=${x.eventId}&eventName=${x.first}`, {
        method: 'POST',
        body: JSON.stringify(x.body),
      },
      )
    }, 1000)
  })
}, 500)

export function sendPixel(eventName: string, eventData?: any) {
  const eventId = generateEventId()
  const body: any = {}

  if (eventData && Object.keys(eventData).length > 0)
    body.eventData = JSON.stringify(eventData)

  if (completed) {
    window.fbq('track', eventName, eventData || {}, { eventID: eventId })
    fetch(
      `${import.meta.env.VITE_BACKEND}/pixel?eventId=${eventId}&eventName=${eventName}`, {
        method: 'POST',
        body: JSON.stringify(body),
      },
    )
  }
  else {
    toPush.push({
      first: eventName,
      second: eventData || {},
      third: { eventID: eventId },
      eventId,
      body,
    })
  }
}
