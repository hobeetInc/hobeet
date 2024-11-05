// 대분류 카테고리 타입
export interface MainCategory {
  main_category_id: number;
  main_category_name: string;
}

// 중분류 카테고리 타입
export interface SubCategory {
  sub_category_id: number;
  main_category_id: number;
  sub_category_name: string;
}

// 카테고리 리스트 props
export type CategoryListProps = {
  categoryId: number;
  selectedCategory: number;
};

// 대분류 카테고리 타입
export interface Category {
  id: number;
  name: string;
  icon: string;
  alt: string;
}
