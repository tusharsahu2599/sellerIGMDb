"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, User, Tag, Ticket } from "lucide-react";
import createApi from "../utils/api";
import { useEffect, useState } from "react";

export default function IssueDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("Issue ID:", id);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [issueCodes, setIssueCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubCode, setSelectedSubCode] = useState("");
  const [description, setDescription] = useState("");
  const [refundAmount, setRefundAmount] = useState<number>(0);

  const [issueDetails, setIssueDetails] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setSelectedCode("");
    setSelectedSubCode("");
    setDescription("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setRefundAmount(0);
    setIsModalOpen(false);
  };

  // Later you will fetch full issue details here using the ID.

  //Get Issues
  // Get Issues
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const api = createApi();
      const response = await api.get("/getIssueCodes"); // 👈 API Endpoint

      // Assuming API returns like this:
      // { issueCodes: [ ... ] }
      if (response?.data?.issueCodes) {
        setIssueCodes(response.data.issueCodes);
      }
    } catch (error) {
      console.error("❌ Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  //Fetch Issue by ID
  const fetchIssueById = async (issueId: string | null) => {
    if (!issueId) return;

    try {
      setLoading(true);

      const api = createApi();
      const response = await api.post("/getIssueById", { issueId: issueId });
      const summary = response.data?.data?.summary;

      // get provider name
      const providerActor =
        summary.actors?.find((a: any) => a.type === "COUNTERPARTY_NP") ||
        summary.actors?.[0];

      const actions = summary.actions || [];
      const latestAction = actions[actions.length - 1] || {};

      setIssueDetails({
        id: summary.issue_id,
        title: summary.descriptor?.short_desc || "Issue Detail",
        shortDesc: summary.descriptor?.short_desc || "",
        longDesc: summary.descriptor?.long_desc || "",
        orderId: summary.order_id,
        provider: providerActor?.info?.person?.name || "Unknown Provider",
        status: summary.issue_status,
        priority:
          summary.issue_status === "OPEN"
            ? "High"
            : summary.issue_status === "PROCESSING"
              ? "Medium"
              : "Low",
        created: new Date(summary.created_at).toLocaleString(),
        updated: new Date(summary.updated_at).toLocaleString(),
        actions: summary?.actions,
        lastAction: {
          by: latestAction.actor_details?.name || "Unknown",
          action: latestAction.descriptor?.code || "",
          time: latestAction.updated_at
            ? new Date(latestAction.updated_at).toLocaleString()
            : "-",
        },
      });
    } catch (error) {
      console.error("❌ Error fetching issue details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchIssueById(id);
  }, []);

  console.log("Fetched Issues Data:", issueDetails);

  //Loader component
  if (loading || !issueDetails) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const issue = issueDetails;

  const selectedIssue: any = issueCodes.find(
    (item: any) => item.code === selectedCode
  );

  //POST ISSUE INFO REQUEST FUNCTION
  const issueInfo = () => {
    console.log("Selected Issue Code:", selectedCode);
    console.log("Selected Sub Code:", selectedSubCode);
    console.log("Description:", description);
    console.log("Issue Id:", id);
    if (!id && !selectedCode && !selectedSubCode) return;

    try {
      const api = createApi();
      api
        .post("/getIssueInfo", {
          issueId: id,
          code: selectedCode.toUpperCase(),
          infoCode: selectedSubCode,
          shortDesc: description,
          refundAmount: +refundAmount,
        })
        .then((response) => {
          console.log("Issue Info Request Response:", response);
          closeModal();
          // refetch after a short delay to let backend process
          setTimeout(() => fetchIssueById(id), 2000);
        })
        .catch((error) => {
          console.error("❌ Error sending issue info request:", error);
        });
    } catch (error) {
      console.error("❌ Error sending issue info request:", error);
    }
  };

  //Colors of Stepper Dots
  const getDotColor = (code: string) => {
    switch (code) {
      case "OPEN":
        return "bg-yellow-500";
      case "PROCESSING":
        return "bg-blue-500";
      case "INFO_REQUESTED":
        return "bg-purple-500";
      case "RESOLUTION_PROPOSED":
        return "bg-sky-500";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={18} /> Back to Tickets
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Ticket size={22} className="text-blue-600" />
        Issue Details
      </h1>

      {/* Issue Summary Card */}
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{issue.title}</h2>

        <p className="text-gray-700 text-sm">
          <span className="font-medium text-gray-900">Issue ID:</span>{" "}
          {issue.id}
        </p>

        <p className="text-gray-700 text-sm">
          <span className="font-medium text-gray-900">Order ID:</span>{" "}
          {issue.orderId}
        </p>

        <p className="text-gray-700 text-sm">
          <span className="font-medium text-gray-900">Provider:</span>{" "}
          {issue.provider}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold ${issue.status === "OPEN"
              ? "bg-yellow-100 text-yellow-700"
              : issue.status === "PROCESSING"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
              }`}
          >
            Status: {issue.status}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold ${issue.priority === "High"
              ? "bg-red-100 text-red-700"
              : issue.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
              }`}
          >
            Priority: {issue.priority}
          </span>
        </div>
      </div>

      {/* Latest Action */}
      <div className="bg-white mt-6 shadow-sm rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Latest Action
        </h3>

        <p className="text-gray-700 flex items-center gap-2">
          <User size={16} className="text-gray-500" />
          {issue.lastAction.by}
        </p>

        <p className="text-gray-700 capitalize mt-1 flex items-center gap-2">
          <Tag size={16} className="text-gray-500" />
          {issue.lastAction.action}
        </p>

        <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          {issue.lastAction.time}
        </p>
      </div>

      {/* Issue Action Timeline */}
      <div className="bg-white mt-6 shadow-sm rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Issue Action History
        </h3>

        <div className="relative border-l border-gray-300 pl-8 space-y-6">
          {issue.actions.map((step: any) => (
            <div key={step.id} className="relative">
              {/* Step Dot */}
              <span
                className={`absolute -left-4 w-3 h-3 rounded-full ${getDotColor(
                  step.descriptor?.code
                )}`}
              />

              {/* Title */}
              <p className="text-gray-900 font-medium capitalize">
                {step.descriptor.short_desc}
              </p>

              {/* Actor + Timestamp */}
              <p className="text-gray-600 text-sm flex gap-2">
                <span className="font-medium">
                  {step.actor_details?.name || step.action_by || "System"}
                </span>
                • <span>{new Date(step.updated_at).toLocaleString()}</span>
              </p>

              {/* Status Chip */}
              <span
                className={`mt-1 inline-block text-xs px-2 py-1 rounded-full font-semibold
          ${step.descriptor.code === "OPEN"
                    ? "bg-yellow-100 text-yellow-700"
                    : step.descriptor.code === "PROCESSING"
                      ? "bg-blue-100 text-blue-700"
                      : step.descriptor.code === "INFO_REQUESTED"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                  }`}
              >
                {step.descriptor.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white mt-6 shadow-sm rounded-lg p-6 border border-gray-200 space-y-3">
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Short Description:</span>{" "}
          {issue.shortDesc}
        </p>

        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Long Description:</span>{" "}
          {issue.longDesc}
        </p>
        <button
          onClick={() => openModal()}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition"
        >
          INFO REQUEST
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
        >
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Issue Info Request Flow
            </h2>

            {/* First Dropdown */}
            <label className="block mb-2 text-gray-700 font-medium">
              Select Issue Code
            </label>
            <select
              value={selectedCode}
              onChange={(e) => {
                setSelectedCode(e.target.value);
                setSelectedSubCode(""); // Reset second dropdown
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            >
              <option value="" disabled>
                Select issue status
              </option>
              {issueCodes?.map((item: any) => (
                <option key={item.code} value={item.code}>
                  {item.code}
                </option>
              ))}
            </select>

            {/* ✅ If INFO_REQUESTED → show sub codes */}
            {selectedIssue?.codes && selectedIssue.codes.length > 0 && (
              <>
                <label className="block mb-2 text-gray-700 font-medium">
                  Select INFO Code
                </label>
                <select
                  value={selectedSubCode}
                  onChange={(e) => setSelectedSubCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Select {selectedSubCode} code
                  </option>
                  {selectedIssue.codes.map((c: any) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* ✅ If RESOLUTION_PROPOSED → show children */}
            {selectedIssue?.children && selectedIssue.children.length > 0 && (
              <>
                <label className="block mb-2 text-gray-700 font-medium">
                  Select Resolution Type
                </label>
                <select
                  value={selectedSubCode}
                  onChange={(e) => setSelectedSubCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Select resolution
                  </option>
                  {selectedIssue.children.map((child: any) => (
                    <option key={child.code} value={child.code}>
                      {child.code} - {child.short_desc}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* ✅ Text Input Field */}
            <label className="block mb-2 text-gray-700 font-medium">
              Short Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={selectedIssue?.short_desc || "Short description"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />

            {
              // ✅ If REFUND_PROPOSED is selected
              selectedSubCode === "REFUND" && (
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Refund Amount
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e: any) => setRefundAmount(e.target.value)}
                    placeholder={"Refund Amount"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  />
                </div>
              )
            }

            {/* Debug / Save */}
            <button
              onClick={issueInfo}
              className="mt-2 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
            >
              Save Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
