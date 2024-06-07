import React from 'react';
import './styles.css';

interface BtnsProps {
    numOfPage: number;
    setNumOfPage: (page: number) => void;
    total: number;
  }
  
  export default function Btns({ numOfPage, setNumOfPage, total }: BtnsProps) {
    const handleClickNext = (): void => {
      if (numOfPage < total - 1) {
        setNumOfPage(numOfPage + 1);
      }
    };
  
    const handleClickPrevious = (): void => {
      if (numOfPage > 0) {
        setNumOfPage(numOfPage - 1);
      }
    };
  
    const handleClickFirst = (): void => {
      setNumOfPage(0);
    };
  
    const handleClickLast = (): void => {
      setNumOfPage(total - 1);
    };
  
    const handleClickPage = (index: number): void => {
      setNumOfPage(index);
    };
  
    const pagesToShow: number[] = [];
    const end = Math.min(total, 5);
    let start = Math.min(numOfPage - 2, total - end);
    start = Math.max(0, start);
    for (let i = start; i < start + end; i++) {
      pagesToShow.push(i);
    }
  
    return (
      <div className='btns'>
        <button name='first' onClick={handleClickFirst} disabled={numOfPage === 0}>
          First
        </button>
        <button name='previous' onClick={handleClickPrevious} disabled={numOfPage === 0}>
          Previous
        </button>
        {pagesToShow.map((pageIndex) => (
          <button
            key={pageIndex}
            name={`page-${pageIndex + 1}`}
            onClick={() => handleClickPage(pageIndex)}
            disabled={numOfPage === pageIndex}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button name='next' onClick={handleClickNext} disabled={numOfPage === total - 1}>
          Next
        </button>
        <button name='last' onClick={handleClickLast} disabled={numOfPage === total - 1}>
          Last
        </button>
      </div>
    );
  };