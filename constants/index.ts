export const MAX_PINED = 5

export const LINKS = {
  home: "/",
  mypage: "/my-page",
  studynow: (id: string) => { return `/my-page/${id}/study-now` },
  browse: (id: string) => { return `/my-page/${id}/browse` },
  edit: ({categoryId, itemId}: {categoryId: string, itemId: string}) => { return `/my-page/${categoryId}/edit/${itemId}` },
  create: (id: string) => { return `/my-page/${id}/create` },
  done: (id: string) => { return `/my-page/${id}/done` },
}

export const ERROR_MESSAGE = {
  nonempty: "入力してください。",
  min: (count: number) => { return `${count}文字以上で入力してください。` },
  max: (count: number) => { return `${count}文字以内で入力してください。` }
}