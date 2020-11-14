export class SpaceMarine {
  id: number;
  name: string;
  category: string;
  height: number;
  health: number;
  meleeWeapon: string;
  chapterName: string;
  chapterMarinesCount: number;
  coordinateX: number;
  coordinateY: number;

  constructor(
    name: string,
    category: string,
    height: number,
    health: number,
    meleeWeapon: string,
    chapterName: string,
    chapterMarinesCount: number,
    coordinateX: number,
    coordinateY: number){
    this.name = name;
    this.category = category;
    this.height = height;
    this.health = health;
    this.meleeWeapon = meleeWeapon;
    this.chapterName = chapterName;
    this.chapterMarinesCount = chapterMarinesCount;
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }

  public static createSpaceMarineFromObject(objectSpaceMarine: any) : SpaceMarine {
    let spaceMarine: SpaceMarine =new SpaceMarine(
      objectSpaceMarine.name._text,
      objectSpaceMarine.category._text,
      objectSpaceMarine.height._text,
      objectSpaceMarine.health._text,
      objectSpaceMarine.meleeWeapon._text,
      objectSpaceMarine.chapter.name._text,
      objectSpaceMarine.chapter.marinesCount._text,
      objectSpaceMarine.coordinates.x._text,
      objectSpaceMarine.coordinates.y._text);

    spaceMarine.id = objectSpaceMarine.id._text;

     return spaceMarine;
  }

  public static createBasicSpaceMarine(): SpaceMarine {
    return new SpaceMarine(
      'Sam',
      'HELIX',
      10,
      20,
      'CHAIN_SWORD',
      'Gray Wolfs',
      90,
      0.0,
      0);
  }

  public static getSpaceMarineXmlPattern() {
    return (name, height, category, health, meleeWeapon, chapterName, chapterMarinesCount, coordinateX, coordinateY) =>
      `<?xml version="1.0"?>
        <spaceMarine>
          <name>${name}</name>
          <coordinates>
            <x>${coordinateX}</x>
            <y>${coordinateY}</y>
          </coordinates>
          <height>${height}</height>
          <category>${category}</category>
          <health>${health}</health>
          <meleeWeapon>${meleeWeapon}</meleeWeapon>
          <chapter>
            <name>${chapterName}</name>
            <marinesCount>${chapterMarinesCount}</marinesCount>
          </chapter>
        </spaceMarine>`;
  }
}
