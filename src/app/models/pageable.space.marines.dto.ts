import {SpaceMarine} from "./space.marine";

export interface PageableSpaceMarinesDto {
  elementsAtPage: number,
  isLastPage: boolean,
  pageNumber: number,
  spaceMarines: SpaceMarine[]
  totalPages: number
  totalElements: number
}
