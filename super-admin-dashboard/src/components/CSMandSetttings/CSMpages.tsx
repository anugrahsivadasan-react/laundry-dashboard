import React, { useEffect, useRef, useState } from "react"
import { File, Save } from "lucide-react"
import { apiAxios } from "../../config/axios"
import toast from "react-hot-toast"

interface FAQItem {
  question: string
  answer: string
}

const CSMpages: React.FC = () => {
  const [aboutTitle, setAboutTitle] = useState("")
  const [aboutContent, setAboutContent] = useState("")

  const [termsTitle, setTermsTitle] = useState("")
  const [termsContent, setTermsContent] = useState("")

  const [privacyTitle, setPrivacyTitle] = useState("")
  const [privacyContent, setPrivacyContent] = useState("")

  const [faqTitle, setFaqTitle] = useState("")
  const [faqs, setFaqs] = useState<FAQItem[]>([])

  const [loading, setLoading] = useState({
    about: false,
    terms: false,
    privacy: false,
    faq: false,
  })

  //  store last saved state
  const lastSavedRef = useRef({
    about: { title: "", content: "" },
    terms: { title: "", content: "" },
    privacy: { title: "", content: "" },
    faq: { title: "", faq: [] as FAQItem[] },
  })

  //  helper
  const isSameFAQ = (a: FAQItem[], b: FAQItem[]) =>
    JSON.stringify(a) === JSON.stringify(b)

  //  load all pages
  useEffect(() => {
    const loadAllPages = async () => {
      try {
        const [aboutRes, termsRes, privacyRes, faqRes] = await Promise.all([
          apiAxios.get(`super_admin/setting/page/ABOUT`),
          apiAxios.get(`super_admin/setting/page/TERMS`),
          apiAxios.get(`super_admin/setting/page/PRIVACY`),
          apiAxios.get(`super_admin/setting/page/FAQ`),
        ])

        const about = aboutRes.data.data
        const terms = termsRes.data.data
        const privacy = privacyRes.data.data
        const faq = faqRes.data.data

        setAboutTitle(about?.title || "")
        setAboutContent(about?.content || "")

        setTermsTitle(terms?.title || "")
        setTermsContent(terms?.content || "")

        setPrivacyTitle(privacy?.title || "")
        setPrivacyContent(privacy?.content || "")

        setFaqTitle(faq?.title || "")
        setFaqs(faq?.faq || [])

        //  set last saved
        lastSavedRef.current = {
          about: {
            title: about?.title || "",
            content: about?.content || "",
          },
          terms: {
            title: terms?.title || "",
            content: terms?.content || "",
          },
          privacy: {
            title: privacy?.title || "",
            content: privacy?.content || "",
          },
          faq: {
            title: faq?.title || "",
            faq: (faq?.faq || []).map((f) => ({ ...f })),
          },
        }
      } catch {
        toast.error("Failed to load pages")
      }
    }

    loadAllPages()
  }, [])

  const addFAQ = () => {
    setFaqs([...faqs.map((f) => ({ ...f })), { question: "", answer: "" }])
  }

  const updateFAQ = (index: number, field: string, value: string) => {
    const updated = faqs.map((f, i) =>
      i === index
        ? { ...f, [field]: value } // ✅ new object
        : f,
    )

    setFaqs(updated)
  }
  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  // ================= SAVE FUNCTIONS =================

  const saveAbout = async () => {
    const prev = lastSavedRef.current.about

    if (prev.title === aboutTitle && prev.content === aboutContent) {
      return toast("No changes to save")
    }

    try {
      const res = await apiAxios.post(`super_admin/setting/page`, {
        type: "ABOUT",
        title: aboutTitle,
        content: aboutContent,
      })

      const data = res.data.data

      lastSavedRef.current.about = {
        title: data.title,
        content: data.content,
      }

      toast.success(res.data.message)
    } catch {
      toast.error("Failed to save About")
    }
  }

  const saveTerms = async () => {
    const prev = lastSavedRef.current.terms

    if (prev.title === termsTitle && prev.content === termsContent) {
      return toast("No changes to save")
    }

    try {
      const res = await apiAxios.post(`super_admin/setting/page`, {
        type: "TERMS",
        title: termsTitle,
        content: termsContent,
      })

      const data = res.data.data

      lastSavedRef.current.terms = {
        title: data.title,
        content: data.content,
      }

      toast.success(res.data.message)
    } catch {
      toast.error("Failed to save Terms")
    }
  }

  const savePrivacy = async () => {
    const prev = lastSavedRef.current.privacy

    if (prev.title === privacyTitle && prev.content === privacyContent) {
      return toast("No changes to save")
    }

    try {
      const res = await apiAxios.post(`super_admin/setting/page`, {
        type: "PRIVACY",
        title: privacyTitle,
        content: privacyContent,
      })

      const data = res.data.data

      lastSavedRef.current.privacy = {
        title: data.title,
        content: data.content,
      }

      toast.success(res.data.message)
    } catch {
      toast.error("Failed to save Privacy")
    }
  }

  const saveFAQ = async () => {
    const prev = lastSavedRef.current.faq

    if (!faqs.length) return toast.error("Add at least one FAQ")

    const hasEmpty = faqs.some((f) => !f.question.trim() || !f.answer.trim())

    if (hasEmpty) return toast.error("Fill all FAQ fields")

    if (prev.title === faqTitle && isSameFAQ(prev.faq, faqs)) {
      return toast("No changes to save")
    }

    try {
      const res = await apiAxios.post(`super_admin/setting/page`, {
        type: "FAQ",
        title: faqTitle,
        faq: faqs,
      })

      const data = res.data.data

      lastSavedRef.current.faq = {
        title: data.title,
        faq: (data.faq || []).map((f: any) => ({ ...f })),
      }

      setFaqTitle(data.title)
      setFaqs(data.faq || [])

      toast.success(res.data.message)
    } catch {
      toast.error("Failed to save FAQ")
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white p-8">
      <div className="grid grid-cols-2 gap-6">
        {/* ABOUT */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <p className="flex text-[16px] leading-[16px] text-gray-300 mb-4 gap-1">
            {" "}
            <File size={16} /> About Us
          </p>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            rows={6}
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={saveAbout}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
            <Save /> Save Changes
          </button>
        </div>

        {/* FAQ */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">FAQ</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={faqTitle}
            onChange={(e) => setFaqTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400 mb-2 block">FAQ Items</label>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1b1e] border border-[#2a2a2a] rounded mb-3 p-3 relative"
            >
              <button
                onClick={() => removeFAQ(index)}
                disabled={faqs.length === 1}
                className={`absolute top-2 right-2 text-xs ${
                  faqs.length === 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-red-400 hover:text-red-300"
                }`}
              >
                ✕
              </button>
              <input
                placeholder="Q:"
                value={faq.question}
                onChange={(e) => updateFAQ(index, "question", e.target.value)}
                className="w-full mb-2 bg-transparent outline-none"
              />

              <input
                placeholder="A:"
                value={faq.answer}
                onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          ))}

          <button
            onClick={addFAQ}
            className="w-full bg-gray-700 hover:bg-gray-600 p-2 rounded mb-3 text-sm"
          >
            + Add New FAQ
          </button>

          <button
            onClick={saveFAQ}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
            <Save /> Save Changes
          </button>
        </div>

        {/* TERMS */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">Terms & Conditions</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={termsTitle}
            onChange={(e) => setTermsTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            rows={6}
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={saveTerms}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
            <Save /> Save Changes
          </button>
        </div>

        {/* PRIVACY */}
        <div className="bg-[#111214] p-6 rounded-xl border border-[#1f1f1f]">
          <h2 className="text-sm text-gray-300 mb-4">Privacy Policy</h2>

          <label className="text-xs text-gray-400">Page Title</label>
          <input
            value={privacyTitle}
            onChange={(e) => setPrivacyTitle(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <label className="text-xs text-gray-400">Content</label>
          <textarea
            rows={6}
            value={privacyContent}
            onChange={(e) => setPrivacyContent(e.target.value)}
            className="w-full mt-1 mb-4 p-2 rounded bg-[#1a1b1e] border border-[#2a2a2a]"
          />

          <button
            onClick={savePrivacy}
            className="flex justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm"
          >
            <Save /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default CSMpages
