// 중분류 카테고리 타입
export interface SubCategory {
  s_c_id: number;
  m_c_id: number;
  s_c_name: string;
}

// 카테고리 리스트 props
export type CategoryListProps = {
  categoryId: number;
  selectedCategory: number;
};
