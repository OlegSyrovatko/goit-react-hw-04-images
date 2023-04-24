import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;
