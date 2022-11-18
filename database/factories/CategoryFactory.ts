import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const CategoryFactory = Factory.define(Category, ({}) => {
  return {
    name: 'Category',
  }
}).build()
