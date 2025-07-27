import { run } from "./db";

async function addRefreshTokenColumn() {
  try {
    // Проверяем, существует ли уже колонка refreshToken
    const result = await run(`PRAGMA table_info(users)`);
    console.log('Current table structure:', result);
    
    // Добавляем колонку refreshToken если её нет
    await run(`ALTER TABLE users ADD COLUMN refreshToken TEXT`);
    console.log('refreshToken column added successfully');
  } catch (error: any) {
    // Если колонка уже существует, SQLite выдаст ошибку
    if (error.message.includes('duplicate column name')) {
      console.log('refreshToken column already exists');
    } else {
      console.error('Error adding refreshToken column:', error);
      throw error;
    }
  }
}

export { addRefreshTokenColumn };