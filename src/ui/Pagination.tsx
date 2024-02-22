import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PaginationButtons = ({
  numberOfButtons,
  initialPage,
  handleClick,
  currPage,
  disabled,
}: {
  numberOfButtons: number;
  initialPage: number;
  handleClick: (i: number) => void;
  currPage: number;
  disabled?: boolean;
}) => (
  <div className="mx-2 flex gap-2">
    {Array.from(Array(numberOfButtons).keys())
      .map((i) => i + initialPage)
      .map((p) => (
        <button
          type="button"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-gray-600 disabled:opacity-70 ${
            currPage === p ? "border-ns-400 cursor-not-allowed border-2" : ""
          }`}
          disabled={currPage === p || disabled}
          key={p}
          onClick={() => handleClick(p)}
        >
          {p}
        </button>
      ))}
  </div>
);

export const DesktopPagination = ({
  currPage,
  totalPages,
  onClick,
  disabled,
}: {
  currPage: number;
  totalPages: number;
  onClick: (n: number) => void;
  disabled?: boolean;
}) => {
  const showThreeDotsLeft = totalPages > 6 && currPage > 4;
  const showThreeDotsRight = totalPages > 6 && currPage < totalPages - 3;
  const showFirstGroup = totalPages < 7 ? currPage < 7 : currPage < 5;
  const firstGroupLength =
    totalPages < 7 ? totalPages - 1 : currPage < 4 ? 4 : 5;

  const secondGroupLength =
    totalPages - currPage < 2 ? 4 : Math.min(5, totalPages - currPage + 2);

  const secondGroupStart =
    totalPages - currPage < 2
      ? currPage - 4 + totalPages - currPage
      : currPage - 2;

  return (
    <div className="flex w-full min-w-[440px]">
      <button
        type="button"
        disabled={currPage === 1 || disabled}
        onClick={() => onClick(currPage - 1)}
        className={`mr-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs text-gray-600 ${
          currPage === 1 ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        <FaChevronLeft />
      </button>

      <div className="flex items-baseline">
        <button
          type="button"
          disabled={currPage === 1 || disabled}
          onClick={() => onClick(1)}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-gray-600 disabled:opacity-70 ${
            currPage === 1 ? "border-ns-400 cursor-not-allowed border-2" : ""
          }`}
        >
          1
        </button>
        {showThreeDotsLeft && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm text-gray-600 ${
              disabled ? "opacity-70" : ""
            }`}
          >
            ...
          </div>
        )}

        {showFirstGroup && (
          <PaginationButtons
            disabled={disabled}
            numberOfButtons={firstGroupLength}
            initialPage={2}
            handleClick={onClick}
            currPage={currPage}
          />
        )}

        {totalPages > 6 && currPage >= 5 && (
          <PaginationButtons
            disabled={disabled}
            numberOfButtons={secondGroupLength}
            initialPage={secondGroupStart}
            handleClick={onClick}
            currPage={currPage}
          />
        )}

        {showThreeDotsRight && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm text-gray-600 ${
              disabled ? "opacity-70" : ""
            }`}
          >
            ...
          </div>
        )}

        {totalPages > 6 && (
          <button
            disabled={currPage === totalPages || disabled}
            onClick={() => onClick(totalPages)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-gray-600 disabled:opacity-70 ${
              currPage === totalPages
                ? "border-ns-400 cursor-not-allowed border-2"
                : ""
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        type="button"
        disabled={currPage === totalPages || disabled}
        onClick={() => onClick(currPage + 1)}
        className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs text-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export const MobilePagination = ({
  currPage,
  totalPages,
  onClick,
  disabled,
}: {
  currPage: number;
  totalPages: number;
  onClick: (n: number) => void;
  disabled?: boolean;
}) => {
  const showThreeDotsLeft = totalPages >= 6 && currPage >= 4;
  const showThreeDotsRight = totalPages >= 6 && totalPages - currPage > 2;
  const showFirstGroup = totalPages < 6 || (totalPages >= 6 && currPage <= 3);
  const showSecondGroup = totalPages >= 6 && currPage >= 4;

  const firstGroupLength =
    totalPages < 6 ? totalPages - 1 : currPage < 3 ? 2 : 3;

  const secondGroupLength = 3;

  const secondGroupStart = Math.min(currPage - 2, totalPages - 4);

  return (
    <div className="flex w-full">
      <div className="flex w-full items-baseline justify-center">
        <button
          type="button"
          disabled={currPage === 1 || disabled}
          onClick={() => onClick(1)}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-gray-600 disabled:opacity-70 ${
            currPage === 1 ? "border-ns-400 cursor-not-allowed border-2" : ""
          }`}
        >
          1
        </button>

        {showThreeDotsLeft && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm text-gray-600 ${
              disabled ? "opacity-70" : ""
            }`}
          >
            ...
          </div>
        )}

        {showFirstGroup && (
          <PaginationButtons
            disabled={disabled}
            numberOfButtons={firstGroupLength}
            initialPage={2}
            handleClick={onClick}
            currPage={currPage}
          />
        )}

        {showSecondGroup && (
          <PaginationButtons
            disabled={disabled}
            numberOfButtons={secondGroupLength}
            initialPage={secondGroupStart + 1}
            handleClick={onClick}
            currPage={currPage}
          />
        )}

        {showThreeDotsRight && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm text-gray-600 ${
              disabled ? "opacity-70" : ""
            }`}
          >
            ...
          </div>
        )}

        {totalPages > 5 && (
          <button
            disabled={currPage === totalPages || disabled}
            onClick={() => onClick(totalPages)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-gray-600 disabled:opacity-70 ${
              currPage === totalPages
                ? "border-ns-400 cursor-not-allowed border-2"
                : ""
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>
    </div>
  );
};

export interface PaginationType {
  perPage: number;
  currPage: number;
}

export const Pagination = ({
  pagination,
  total,
  disabled,
  onClick,
}: {
  pagination: PaginationType;
  total: number;
  disabled?: boolean;
  onClick: (n: number) => void;
}) => {
  const { perPage, currPage } = pagination;
  const totalPages = Math.max(Math.ceil(total / perPage), 1);

  return (
    <div className="@container flex w-full max-w-md flex-wrap items-center">
      <div className="@[440px]:flex hidden w-full">
        <DesktopPagination
          disabled={disabled}
          currPage={currPage}
          totalPages={totalPages}
          onClick={onClick}
        />
      </div>
      <div className="@[440px]:hidden flex w-full">
        <MobilePagination
          disabled={disabled}
          currPage={currPage}
          totalPages={totalPages}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
