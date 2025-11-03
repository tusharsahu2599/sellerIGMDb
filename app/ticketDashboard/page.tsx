"use client";

import React, { useEffect, useState } from "react";
import { ticketData } from "../assets/data/ticketData";
import api from "../utils/api";

const TicketDashboard = () => {

  //Ticket state for testing with static data
  // const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  // // ✅ Format only summary data
  // const tickets = ticketData.issues.map((issue) => {
  //   const summary = issue.summary || {};
  //   const descriptor = summary.descriptor || {};
  //   const actions = summary.actions || [];

  //   // Find the most recent action (last in the array)
  //   const latestAction = actions[actions.length - 1] || {};
  //   const actionActor = latestAction.actor_details?.name || "Unknown";
  //   const actionDesc = latestAction.descriptor?.code || "";
  //   const actionTime = latestAction.updated_at
  //     ? new Date(latestAction.updated_at).toLocaleString()
  //     : "-";

  //   // Extract key details
  //   const actor =
  //     summary.actors?.find((a: any) => a.type === "COUNTERPARTY_NP") ||
  //     summary.actors?.[0];

  //   const status = summary.issue_status || "Unknown";

  //   const color =
  //     status === "OPEN"
  //       ? "border-yellow-500"
  //       : status === "PROCESSING"
  //       ? "border-blue-500"
  //       : "border-green-500";

  //   const priority =
  //     status === "OPEN" ? "High" : status === "PROCESSING" ? "Medium" : "Low";

  //   return {
  //     id: summary.issue_id || issue._id,
  //     title: descriptor.short_desc || "Untitled Issue",
  //     shortDescription: descriptor.short_desc || "No description available",
  //     longDescription: descriptor.long_desc || "No description available",
  //     orderId: summary.order_id || "N/A",
  //     provider: actor?.info?.person?.name || "Unknown Provider",
  //     category: descriptor.code || "General",
  //     status,
  //     created: new Date(summary.created_at).toLocaleString(),
  //     updated: new Date(summary.updated_at).toLocaleString(),
  //     priority,
  //     color,
  //     lastAction: {
  //       by: actionActor,
  //       action: actionDesc,
  //       time: actionTime,
  //     },
  //   };
  // });

  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch tickets from API
  const fetchTickets = async () => {
    try {
      const response = await api.get("/getIssues"); // or your endpoint
      const apiData = response.data?.issues || [];

      // 🔁 Transform your API response to a flat, UI-friendly format
      const mappedTickets = apiData.map((issue: any) => {
        const summary = issue.summary || {};
        const descriptor = summary.descriptor || {};
        const actions = summary.actions || [];

        // Find the most recent action (last in the array)
        const latestAction = actions[actions.length - 1] || {};
        const actionActor = latestAction.actor_details?.name || "Unknown";
        const actionDesc = latestAction.descriptor?.code || "";
        const actionTime = latestAction.updated_at
          ? new Date(latestAction.updated_at).toLocaleString()
          : "-";

        // Extract key details
        const actor =
          summary.actors?.find((a: any) => a.type === "COUNTERPARTY_NP") ||
          summary.actors?.[0];

        const status = summary.issue_status || "Unknown";

        const color =
          status === "OPEN"
            ? "border-yellow-500"
            : status === "PROCESSING"
            ? "border-blue-500"
            : "border-green-500";

        const priority =
          status === "OPEN"
            ? "High"
            : status === "PROCESSING"
            ? "Medium"
            : "Low";

        return {
          id: summary.issue_id || issue._id,
          title: descriptor.short_desc || "Untitled Issue",
          shortDescription: descriptor.short_desc || "No description available",
          longDescription: descriptor.long_desc || "No description available",
          orderId: summary.order_id || "N/A",
          provider: actor?.info?.person?.name || "Unknown Provider",
          category: descriptor.code || "General",
          status,
          created: new Date(summary.created_at).toLocaleString(),
          updated: new Date(summary.updated_at).toLocaleString(),
          priority,
          color,
          lastAction: {
            by: actionActor,
            action: actionDesc,
            time: actionTime,
          },
        };
      });

      setTickets(mappedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Ticket History
      </h1>

      <div className="space-y-4 max-w-5xl mx-auto">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className={`cursor-pointer flex flex-col md:flex-row md:items-center justify-between border-l-4 ${ticket.color} bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition`}
          >
            {/* Left Section */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-blue-700">
                {ticket.title}
              </h2>
              <p className="text-sm text-gray-600">🎫 Issue ID: {ticket.id}</p>
              <p className="text-sm text-gray-600">
                🧾 Order ID: {ticket.orderId}
              </p>
              <p className="text-sm text-gray-600">
                👤 Provider: {ticket.provider}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Category:</span> {ticket.category}
              </p>

              <p className="text-sm text-gray-500">
                <span className="font-medium">Last Action:</span>{" "}
                {ticket.lastAction.by} —{" "}
                <span className="capitalize">{ticket.lastAction.action}</span>
              </p>
            </div>

            {/* Right Section */}
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end text-sm">
              <p className="text-gray-500">
                <span className="font-medium">Created At:</span>{" "}
                {ticket.created}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Updated At:</span>{" "}
                {ticket.updated}
              </p>

              <span
                className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === "OPEN"
                    ? "bg-yellow-100 text-yellow-700"
                    : ticket.status === "PROCESSING"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Status: {ticket.status}
              </span>

              <span
                className={`mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  ticket.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : ticket.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Priority: {ticket.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
        >
          <div className="bg-white max-w-lg w-full mx-4 rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {selectedTicket.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Issue ID:</span> {selectedTicket.id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Order ID:</span>{" "}
              {selectedTicket.orderId}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Provider:</span>{" "}
              {selectedTicket.provider}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Category:</span>{" "}
              {selectedTicket.category}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Status:</span>{" "}
              {selectedTicket.status}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Priority:</span>{" "}
              {selectedTicket.priority}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Created:</span>{" "}
              {selectedTicket.created}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Updated:</span>{" "}
              {selectedTicket.updated}
            </p>

            <hr className="my-3" />

            <p className="text-sm text-gray-700 mb-1 font-medium">
              Latest Action
            </p>
            <p className="text-sm text-gray-600">
              {selectedTicket.lastAction.by} —{" "}
              <span className="capitalize">
                {selectedTicket.lastAction.action}
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {selectedTicket.lastAction.time}
            </p>

            <hr className="my-3" />

            <p className="text-gray-700">
              Short Description: {selectedTicket.shortDescription}
            </p>
            <p className="text-gray-700">
              Long Description: {selectedTicket.longDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDashboard;

// "use client";

// import React, { useEffect, useState } from "react";
// import api from "../utils/api";

// const TicketDashboard = () => {
//   const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
//   const [tickets, setTickets] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch tickets from API
//   const fetchTickets = async () => {
//     try {
//       const response = await api.get("/getAllIssues"); // or your endpoint
//       const apiData = response.data?.issues || [];

//       // 🔁 Transform your API response to a flat, UI-friendly format
//       const mappedTickets = apiData.map((issue: any) => {
//         const summary = issue.summary || {};
//         const item = summary.item_ids?.[0];

//         return {
//           id: issue._id,
//           title:
//             summary.short_description ||
//             summary.descriptor?.short_desc ||
//             "Untitled Issue",
//           author: summary.provider_name || "Unknown",
//           department: summary.category || "General",
//           created: new Date(summary.created_at).toLocaleString(),
//           updated: new Date(summary.updated_at).toLocaleString(),
//           responses: summary.respondent_actions?.length || 0,
//           lastRepliedBy:
//             summary.respondent_actions?.[0]?.actor_details?.name ||
//             "Not available",
//           priority:
//             summary.state === "Accepted"
//               ? "Low"
//               : summary.status === "OPEN"
//               ? "High"
//               : "Critical",
//           status:
//             summary.status === "CLOSED"
//               ? "Solved"
//               : summary.status === "OPEN"
//               ? "Open"
//               : "Under Inspection",
//           color:
//             summary.status === "CLOSED"
//               ? "border-green-500"
//               : summary.status === "OPEN"
//               ? "border-yellow-500"
//               : "border-blue-500",
//           description:
//             summary.long_description ||
//             summary.descriptor?.long_desc ||
//             "No description available",
//           image:
//             item?.itemImageUrl ||
//             summary.images?.[0] ||
//             "https://via.placeholder.com/64",
//         };
//       });

//       setTickets(mappedTickets);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Ticket History
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading tickets...</p>
//       ) : tickets.length === 0 ? (
//         <p className="text-center text-gray-500">No tickets found.</p>
//       ) : (
//         <div className="space-y-4 max-w-5xl mx-auto">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               onClick={() => setSelectedTicket(ticket)}
//               className={`cursor-pointer flex flex-col md:flex-row md:items-center justify-between border-l-4 ${ticket.color} bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition`}
//             >
//               {/* Left Section */}
//               <div className="flex-1 flex items-start">
//                 <img
//                   src={ticket.image}
//                   alt={ticket.title}
//                   className="w-14 h-14 object-cover rounded-md mr-4"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold text-blue-700">
//                     {ticket.title}
//                   </h2>
//                   <p className="text-sm text-gray-600">👤 {ticket.author}</p>
//                   <div className="text-sm text-gray-500 mt-1">
//                     <p>
//                       <span className="font-medium">Department:</span>{" "}
//                       {ticket.department}
//                     </p>
//                     <p>
//                       <span className="font-medium">Created & Updated:</span>{" "}
//                       {ticket.created} / {ticket.updated}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end text-sm">
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Responses:</span>{" "}
//                   {ticket.responses}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Last Replied by:</span>{" "}
//                   {ticket.lastRepliedBy}
//                 </p>

//                 <div className="mt-2 flex gap-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       ticket.priority === "Critical"
//                         ? "bg-red-100 text-red-700"
//                         : ticket.priority === "High"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     Priority: {ticket.priority}
//                   </span>

//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       ticket.status === "Solved"
//                         ? "bg-green-100 text-green-700"
//                         : ticket.status === "Under Inspection"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {ticket.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal to show ticket details */}
//       {selectedTicket && (
//         <div
//           className="fixed inset-0 flex justify-center items-center z-50"
//           style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
//         >
//           <div className="bg-white max-w-lg w-full mx-4 rounded-lg shadow-lg p-6 relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedTicket(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               {selectedTicket.title}
//             </h2>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Author:</span>{" "}
//               {selectedTicket.author}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Department:</span>{" "}
//               {selectedTicket.department}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Created:</span>{" "}
//               {selectedTicket.created}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Updated:</span>{" "}
//               {selectedTicket.updated}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Responses:</span>{" "}
//               {selectedTicket.responses}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Last Replied By:</span>{" "}
//               {selectedTicket.lastRepliedBy}
//             </p>
//             <p className="mt-4 text-gray-700">{selectedTicket.description}</p>

//             <div className="mt-4 flex gap-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   selectedTicket.priority === "Critical"
//                     ? "bg-red-100 text-red-700"
//                     : selectedTicket.priority === "High"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 Priority: {selectedTicket.priority}
//               </span>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   selectedTicket.status === "Solved"
//                     ? "bg-green-100 text-green-700"
//                     : selectedTicket.status === "Under Inspection"
//                     ? "bg-blue-100 text-blue-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {selectedTicket.status}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketDashboard;

// "use client";

// import React, { useEffect, useState } from "react";
// import api from "../utils/api";

// type Ticket = {
//   id: number;
//   title: string;
//   author: string;
//   department: string;
//   created: string;
//   updated: string;
//   responses: number;
//   lastRepliedBy: string;
//   priority: "Low" | "High" | "Critical";
//   status: "Solved" | "Open" | "Under Inspection";
//   color: string; // border color
//   description?: string;
// };

// const tickets: Ticket[] = [
//   {
//     id: 1,
//     title: "Mea cibo labores id. Eum in ornatus omittantur",
//     author: "ticket_author",
//     department: "Design, QA, Support",
//     created: "30 Apr 2015 11:07 PM",
//     updated: "19 Nov 2015 09:09 AM",
//     responses: 1,
//     lastRepliedBy: "Mayeenul Islam",
//     priority: "Low",
//     status: "Solved",
//     color: "border-green-500",
//     description:
//       "User reported a design inconsistency in the dashboard. Issue was verified and resolved by the QA team.",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet, agam aperiri cum ne",
//     author: "Mayeenul Islam",
//     department: "Support",
//     created: "30 Apr 2015 11:05 PM",
//     updated: "19 Nov 2015 09:33 AM",
//     responses: 1,
//     lastRepliedBy: "Mayeenul Islam",
//     priority: "Critical",
//     status: "Under Inspection",
//     color: "border-blue-500",
//     description:
//       "Critical issue where user login intermittently fails. The support team is actively monitoring the logs.",
//   },
//   {
//     id: 3,
//     title: "Please upgrade the jQuery as it’s creating many problems",
//     author: "ticket_author",
//     department: "Design",
//     created: "30 Apr 2015 10:24 PM",
//     updated: "08 Nov 2015 09:33 PM",
//     responses: 5,
//     lastRepliedBy: "ticket_author",
//     priority: "High",
//     status: "Open",
//     color: "border-yellow-500",
//     description:
//       "Multiple frontend components are breaking due to outdated jQuery. Migration to v3.6.0 is recommended.",
//   },
//   {
//     id: 4,
//     title: "Can’t post any ticket in this ticketing system",
//     author: "Mayeenul Islam",
//     department: "QA",
//     created: "30 Apr 2015 09:50 PM",
//     updated: "07 Nov 2015 09:50 PM",
//     responses: 3,
//     lastRepliedBy: "Mayeenul Islam",
//     priority: "Low",
//     status: "Open",
//     color: "border-orange-500",
//     description:
//       "QA reported an issue where new tickets could not be submitted due to validation errors.",
//   },
// ];

// const TicketDashboard = () => {
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   //Fetch tickets from API
//   const fetchTickets = async () => {
//     try {
//       const response = await api.get("/tickets");
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Ticket History
//       </h1>

//       <div className="space-y-4 max-w-5xl mx-auto">
//         {tickets.map((ticket) => (
//           <div
//             key={ticket.id}
//             onClick={() => setSelectedTicket(ticket)}
//             className={`cursor-pointer flex flex-col md:flex-row md:items-center justify-between border-l-4 ${ticket.color} bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition`}
//           >
//             {/* Left Section */}
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold text-blue-700">
//                 {ticket.title}
//               </h2>
//               <p className="text-sm text-gray-600">👤 {ticket.author}</p>
//               <div className="text-sm text-gray-500 mt-1">
//                 <p>
//                   <span className="font-medium">Department:</span>{" "}
//                   {ticket.department}
//                 </p>
//                 <p>
//                   <span className="font-medium">Created & Updated:</span>{" "}
//                   {ticket.created} / {ticket.updated}
//                 </p>
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end text-sm">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Responses:</span>{" "}
//                 {ticket.responses}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Last Replied by:</span>{" "}
//                 {ticket.lastRepliedBy}
//               </p>

//               <div className="mt-2 flex gap-3">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     ticket.priority === "Critical"
//                       ? "bg-red-100 text-red-700"
//                       : ticket.priority === "High"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-green-100 text-green-700"
//                   }`}
//                 >
//                   Priority: {ticket.priority}
//                 </span>

//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     ticket.status === "Solved"
//                       ? "bg-green-100 text-green-700"
//                       : ticket.status === "Under Inspection"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {ticket.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal to show ticket details*/}
//       {selectedTicket && (
//         <div
//           className="fixed inset-0 flex justify-center items-center z-50"
//           style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
//         >
//           <div className="bg-white max-w-lg w-full mx-4 rounded-lg shadow-lg p-6 relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedTicket(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               {selectedTicket.title}
//             </h2>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Author:</span>{" "}
//               {selectedTicket.author}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Department:</span>{" "}
//               {selectedTicket.department}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Created:</span>{" "}
//               {selectedTicket.created}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Updated:</span>{" "}
//               {selectedTicket.updated}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Responses:</span>{" "}
//               {selectedTicket.responses}
//             </p>
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-medium">Last Replied By:</span>{" "}
//               {selectedTicket.lastRepliedBy}
//             </p>
//             <p className="mt-4 text-gray-700">{selectedTicket.description}</p>

//             <div className="mt-4 flex gap-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   selectedTicket.priority === "Critical"
//                     ? "bg-red-100 text-red-700"
//                     : selectedTicket.priority === "High"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 Priority: {selectedTicket.priority}
//               </span>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   selectedTicket.status === "Solved"
//                     ? "bg-green-100 text-green-700"
//                     : selectedTicket.status === "Under Inspection"
//                     ? "bg-blue-100 text-blue-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {selectedTicket.status}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketDashboard;
