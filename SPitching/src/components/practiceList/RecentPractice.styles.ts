// import styled from 'styled-components';
// import { theme } from '../../assets/theme';

// export const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(10, 1fr);
//   grid-template-rows: auto 240px 64px;
//   gap: 8px;
// `;

// const Box = styled.div`
//   border-radius: 16px;
//   border: 1px solid rgba(64, 80, 98, 0.1);
//   background: rgba(255, 255, 255, 0.7);
//   box-shadow: 0px 0px 15px 1px rgba(87, 89, 114, 0.08);
//   box-sizing: border-box;
//   padding: 0.8rem;
// `;

// export const TopContainer = styled.div`
//   grid-column: 1 / 11;
//   grid-row: 1 / 2;
//   display: flex;
//   flex-direction: column;
//   .sub {
//     color: ${theme.subText};
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//   }
//   .title {
//     color: ${theme.text};
//     font-family: 'Noto Sans KR';
//     font-size: 21px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
//   }
//   > div {
//     display: flex;
//     gap: 0.5rem;
//     justify-content: flex-start;
//     align-items: baseline;
//   }
// `;

// export const MetaDataWrapper = styled(Box)`
//   grid-column: 1 / 4;
//   grid-row: 2 / 3;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   > div:first-child {
//     width: 100%;
//     aspect-ratio: 16 / 9;
//     background-color: black;
//   }

//   > div {
//     display: flex;
//     flex-direction: row;
//     gap: 0.5rem;
//     align-items: center;
//     justify-content: left;
//     font-size: 0.75rem;
//     font-style: normal;
//     line-height: normal;
//   }
//   > div > span:first-child {
//     font-weight: 400;
//     color: ${theme.text};
//   }
//   > div > span:last-child {
//     font-weight: 300;
//     color: ${theme.subText};
//   }
// `;

// export const GraphWrapper = styled(Box)`
//   grid-column: 4 / 8;
//   grid-row: 2 / 3;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;

// export const GraphTitle = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   margin: 1rem 1rem;
//   > span:first-child {
//     color: ${theme.subText};
//     font-size: 0.75rem;
//     font-weight: 300;
//   }
//   > span:last-child {
//     color: ${theme.text};
//     font-size: 1.3125rem;
//     font-weight: 700;
//   }
// `;
// export const TagWrapper = styled(Box)`
//   grid-column: 8 / 11;
//   grid-row: 2 / 4;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   > span {
//     font-weight: 700;
//     color: ${theme.text};
//     font-size: 1rem;
//   }
// `;

// export const TagContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const SingleTagTitle = styled.div`
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   gap: 0.3rem;
//   .count {
//     width: 0.8125rem;
//     height: 0.8125rem;
//     border-radius: 50%;
//     background-color: ${theme.pointRed};
//     color: #fefffc;
//     font-size: 0.625rem;
//     font-weight: 400;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .pageText {
//     color: ${theme.text};
//     font-weight: 400;
//     font-size: 0.875rem;
//   }
//   .toggle {
//     color: ${theme.subLightBlue};
//     font-weight: 400;
//     font-size: 0.875rem;
//     cursor: pointer;
//   }
// `;

// export const TagNoteList = styled.ul`
//   margin-top: 0.5rem;
//   font-size: 0.9rem;
//   line-height: 1.6;
//   list-style: circle;
//   padding: 0 1.3rem;
//   color: ${theme.subText};
//   font-weight: 400;
//   font-size: 0.75rem;

//   > span {
//     margin-top: 0.5rem;
//     color: #3366cc;
//     cursor: pointer;
//     list-style: none;
//     text-align: right;
//   }
// `;
