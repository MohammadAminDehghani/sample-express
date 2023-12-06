import { Request, Response } from 'express';
import Article, { IArticle } from '../../../../models/article';
import User from '../../../../models/user';
import { faker } from '@faker-js/faker';

export const index = async (req: Request, res: Response): Promise<void> => {
  
  try {
    
    //faker
    // const article = new Article({
    //   user: undefined,
    //   title: faker.string.uuid(),
    //   slug: faker.string.alpha(),
    //   body: faker.string.alpha(200),
    //   image: {},
    //   tags: 'image',
    //   viewCount: faker.number.int({min:0, max: 1000}),
    //   commentCount: faker.number.int({min:0, max: 1000}),
    //   categories: [],
    // });
    // await article.save();
  
    const articles = await Article.find({});

    res.json(articles);
    
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    // Handle article creation logic here
    // Retrieve data from the request body and create a new article
    const articleData: Partial<IArticle> = req.body;
    const newArticle = new Article(articleData);
    await newArticle.save();
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    
    // Render the edit article form with the article data
    res.render('articles.edit', { article });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const articleData: Partial<IArticle> = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(id, articleData, { new: true });
    
    if (!updatedArticle) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);
    
    if (!deletedArticle) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};