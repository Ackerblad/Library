document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".event-link").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const eventId = this.getAttribute("href").substring(1); 
      const event = eventData.find(event => event.id === eventId);
      if (event) {
        document.getElementById("eventTitle").innerText = event.title;
        document.getElementById("eventDescription").innerText = event.description;
        document.getElementById("eventModal").style.display = "block";
      }
    });
  });
});

//Event data
const eventData = [
  { id: "event1Details", title: "Book Signing Event - April 20", description: "Join us for a book signing event with famous authors." },
  { id: "event2Details", title: "Author Meet & Greet - April 25", description: "A chance to meet your favorite authors in person!" },
  { id: "event3Details", title: "Poetry Event - April 28", description: "Celebrate the art of poetry with live readings from both established and emerging poets." },
  { id: "event4Details", title: "Reading Night - May 10 - April 22", description: "Spend a relaxing evening diving into new and classic novels." },
  { id: "event5Details", title: "Local History Day - May 15", description: "Explore the rich history of our community through exclusive archives and talks from local historians." },
  { id: "event6Details", title: "Art and Illustration in Books", description: "Discover the beauty of book illustrations with guest artists demonstrating their techniques." },
  { id: "event7Details", title: "The Future of Digital Books", description: "Join a discussion on the evolving technology behind e-books." },
  { id: "event8Details", title: "Classic Film Series - June 11", description: "Enjoy screenings of classic films based on iconic novels." },
  { id: "event9Details", title: "Workshop - June 18", description: "Participate in our interactive workshops designed to improve your writing skills." },
  { id: "event10Details", title: "Quiz Night - June 23", description: "Test your literary knowledge at our fun-filled quiz night." },
];

//Open a modal for each event
function openEventModal(eventId) {
  const event = eventData.find(e => e.id === eventId);
  if (event) {
    document.getElementById("eventTitle").innerText = event.title;
    document.getElementById("eventDescription").innerText = event.description;
    document.getElementById("eventModal").style.display = "block";
  }
}

//Close the modal
function closeModal() {
  document.getElementById("eventModal").style.display = "none";
}