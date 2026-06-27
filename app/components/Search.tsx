"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/Search.module.css";
import dropdownStyles from "@/app/styles/SearchLoadingState.module.css";
import { IoMdSearch } from "react-icons/io";
import { Book } from "@/app/types/book";
import SearchLoading from "./SearchLoading";
import SkeletonLoading from "./SkeletonLoading";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
        );
        const data: Book[] = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = query.trim().length > 0;

  return (
    <div className={styles.search__background}>
      <div className={styles.search__wrapper} ref={wrapperRef}>
        <div className={styles.search__content}>
          <div className={styles.search}>
            <div className={styles["search__input--wrapper"]}>
              <input
                className={styles.search__input}
                type="text"
                placeholder="Search for books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className={styles.search__icon}>
                <IoMdSearch />
              </div>
            </div>
          </div>
        </div>

        {showDropdown && (
          isLoading ? (
            <SkeletonLoading />
          ) : (
            <div className={dropdownStyles["search__books--wrapper"]}>
              {results.length > 0 ? (
                results.map((book) => (
                  <SearchLoading key={book.id} book={book} />
                ))
              ) : (
                <div style={{ padding: "16px", color: "#6b757b", fontSize: "14px" }}>
                  No results found
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
