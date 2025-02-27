import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from './drizzle/drizzle.module';
import { DrizzleDB } from 'drizzle';
import { Character } from './types';

@Injectable()
export class AppService {
  constructor (
    @Inject(DRIZZLE)
    private db: DrizzleDB,
  ) {}

  private countData(characters: Character[]) {
    const genders = { female: 0, male: 0, other: 0, no_gender: 0 };
    let ageTotal = 0;
    let agesCount = 0;
    let weightTotal = 0;

    characters.forEach((character) => {
      // Could be improved by using ternary operator if like:
      // ['m', 'male'].includes(character.gender.toLowerCase())
      // ? gender.male++
      // : ['f', 'female'].includes(character.gender.toLowerCase())
      // ? gender.female++
      // : gender.other++;

      if (!character.gender) {
        genders.no_gender++;
      } else if (character.gender === 'male' || character.gender.toLowerCase() === 'm') {
        genders.male++;
      } else if (character.gender === 'female' || character.gender.toLowerCase() === 'f') {
        genders.female++;
      } else {
        genders.other++;
      }

      if (character.born) {
        const born = new Date(character.born);
        const today = new Date();
        const diff = today.getTime() - born.getTime();
        
        // Calculating age of character - diff is in milliseconds
        const charAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));    
        ageTotal += charAge;
        agesCount++;
      }
      
      // Adding age of each nemesis (I count all nemeses - alive and not alive)
      ageTotal += character.nemeses.reduce((sum, nemesis) => {
        agesCount++;
        return nemesis.years ? sum + nemesis.years : 0;
      }, 0);
      
      // Weight is sent as a string, so I have to convert it to a number 1817
      const weightNum = Number(character.weight);
      if (weightNum) {
        weightTotal += weightNum;
      }

    });

    // Calculating averages
    const averageAge = Math.round(ageTotal / agesCount);
    const averageWeight = Math.round(weightTotal / characters.length);

    return {
      characters_count: characters.length,
      average_age: averageAge,
      average_weight: averageWeight,
      genders,
    }
  }

  async getData() {
    try {
      const characters: Character[] = await this.db.query.character.findMany({
        with: {
          nemeses: {
            with: {
              secrets: {
                columns: { 
                  nemesisId: false,
                }
              }
            },
            columns: {
              characterId: false,
            }
          }
        }
      });
      
      const data = this.countData(characters);

      return {
        data,
        characters,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
