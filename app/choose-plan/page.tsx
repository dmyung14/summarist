"use client";
import { useState } from "react";
import styles from "@/app/styles/ChoosePlan.module.css";
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import PricingLanding from "@/app/assets/pricing-top.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";
import { app } from "@/firebase/firebase";
import { getCheckoutUrl } from "@/app/stripe/stripePayment";
import AuthModalWrapper from "@/app/components/AuthModalWrapper";

const PRICES = {
  yearly: "price_1TmkxTHqVWHdHMEoOSiogc3S",
  monthly: "price_1TmkxxHqVWHdHMEojja6Csld",
};

const accordions = [
  {
    question: "How does the free 7-day trial work?",
    answer:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    height: "129px",
  },
  {
    question:
      "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    answer:
      "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    height: "66px",
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    height: "87px",
  },
  {
    question: "Can I cancel during my trial or subscription?",
    answer:
      "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    height: "87px",
  },
];

export default function ChoosePlan() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  function handleAccordion(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  async function handleSubscribe() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const priceId = PRICES[selectedPlan];
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      window.location.href = checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.plan}>
      <AuthModalWrapper />
      <div className={styles["plan__header--wrapper"]}>
        <div className={styles.plan__header}>
          <div className={styles.plan__title}>
            Get unlimited access to many amazing books to read
          </div>
          <div className={styles["plan__sub--title"]}>
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className={styles["plan__img--mask"]}>
            <Image
              src={PricingLanding}
              alt="pricing"
              width="860"
              height="722"
              decoding="async"
              data-nimg="1"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles["plan__features--wrapper"]}>
            <div className={styles.plan__features}>
              <figure className={styles["plan__features--icon"]}>
                <IoDocumentText />
              </figure>
              <div className={styles["plan__features--text"]}>
                <b>Key ideas in few min</b>&quot; with many books to read&quot;
              </div>
            </div>
            <div className={styles.plan__features}>
              <figure className={styles["plan__features--icon"]}>
                <RiPlantFill />
              </figure>
              <div className={styles["plan__features--text"]}>
                <b>3 million</b>&quot; people growing with Summarist everyday&quot;
              </div>
            </div>
            <div className={styles.plan__features}>
              <figure className={styles["plan__features--icon"]}>
                <FaHandshake />
              </figure>
              <div className={styles["plan__features--text"]}>
                <b>Precise recommendations</b>&quot; collections curated by experts&quot;
              </div>
            </div>
          </div>
          <div className={styles.section__title}>
            Choose the plan that fits you
          </div>
          <div
            className={`${styles.plan__card} ${selectedPlan === "yearly" ? styles["plan__card--active"] : ""}`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <div className={styles["plan__card--circle"]}>
              {selectedPlan === "yearly" && (
                <div className={styles["plan__card--dot"]}></div>
              )}
            </div>
            <div className={styles["plan__card--content"]}>
              <div className={styles["plan__card--title"]}>
                Premium Plus Yearly
              </div>
              <div className={styles["plan__card--price"]}>$99.99/year</div>
              <div className={styles["plan__card--text"]}>
                7-day free trial included
              </div>
            </div>
          </div>
          <div className={styles["plan__card--separator"]}>
            <div className={styles.plan__separator}>or</div>
          </div>
          <div
            className={`${styles.plan__card} ${selectedPlan === "monthly" && styles["plan__card--active"]}`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <div className={styles["plan__card--circle"]}>
              {selectedPlan === "monthly" && (
                <div className={styles["plan__card--dot"]}></div>
              )}
            </div>
            <div className={styles["plan__card--content"]}>
              <div className={styles["plan__card--title"]}>Premium Monthly</div>
              <div className={styles["plan__card--price"]}>$9.99/month</div>
              <div className={styles["plan__card--text"]}>
                No trial included
              </div>
            </div>
          </div>
          <div className={styles["plan__card--cta"]}>
            <span className={styles["btn--wrapper"]}>
              <button
                className={styles.btn}
                style={{ width: "300px" }}
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : selectedPlan === "yearly"
                  ? "Start your free 7-day trial"
                  : "Start your first month"}
              </button>
            </span>
            <div className={styles.plan__disclaimer}>
              {selectedPlan === "yearly"
                ? "Cancel your trial at any time before it ends, and you won't be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
            {error && (
              <div style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
                {error}
              </div>
            )}
          </div>
          <div className={styles.faq__wrapper}>
            {accordions.map((item, index) => (
              <div key={index} className={styles.accordion__card}>
                <div
                  className={styles.accordion__header}
                  onClick={() => handleAccordion(index)}
                >
                  <div className={styles.accordion__title}>{item.question}</div>
                  <GoChevronDown
                    className={openIndex === index ? styles.rotate : ""}
                  />
                </div>
                <div
                  className={styles.collapse}
                  style={{ height: openIndex === index ? item.height : "0px" }}
                >
                  <div className={styles.accordion__body}>{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="footer">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles["footer__top--wrapper"]}>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Actions</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Summarist Magazine</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Cancel Subscription</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Help</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Contact us</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>
                  Useful Links
                </div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Pricing</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Summarist Business</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Gift Cards</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Company</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>About</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Careers</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Partners</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Other</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Sitemap</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Legal Notice</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Terms of Service</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["footer__copyright--wrapper"]}>
              <div className={styles.footer__copyright}>
                Copyright © 2026 Summarist.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
