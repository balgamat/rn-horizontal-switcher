import styled from 'styled-components/native';

export const Wrapper = styled.ScrollView`
  height: 100%;
  flex-direction: row;
`;
export const Item = styled.TouchableOpacity<{
  scrollable: boolean;
  scrollableWidth: number;
}>`
  width: ${({ scrollable, scrollableWidth }) =>
  scrollable ? scrollableWidth : 'auto'};
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Spacer = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
`;
