export const CHINESE_TEXTS = [
  '人生不是等待风起，而是扬帆起航。',
  '岁月不饶人，但我亦不饶岁月。',
  '温柔是力量，微笑是勇气。',
  '路虽远，行则将至；事虽难，做则必成。',
  '愿你眼里有光，心中有暖，脚下有路。',
  '不怕慢，只怕站。',
  '山高自有路，水深自有渡。',
  '好好吃饭，好好睡觉，认真生活。',
  '一花一世界，一木一浮生。',
  '知足常乐，淡泊明志。',
  '用心过好每一天，未来自会有答案。',
  '笨鸟先飞，勤能补拙。',
  '爱笑的人，运气都不会太差。',
  '静水流深，厚积薄发。',
  '小小善行，足以温暖人心。',
  '花开堪折直须折，莫待无花空折枝。',
  '人生如逆旅，我亦是行人。',
  '细雨湿衣看不见，闲花落地听无声。',
  '纵然困顿难行，亦要砥砺前行。',
  '心安处是吾乡。',
]

export const ENGLISH_TEXTS = [
  'Life is short. Smile while you still have teeth.',
  'Coffee first. Talk later.',
  'Happiness is homemade.',
  'Stay curious. Keep learning.',
  'Little things make big days.',
  'Kindness is free. Sprinkle it everywhere.',
  'Dream big. Start small.',
  'Good things take time.',
  'Be the change you wish to see.',
  'Do more of what makes you happy.',
  'Less perfection. More authenticity.',
  'Create your own sunshine.',
  'Mistakes are proof you are trying.',
  'Progress not perfection.',
  'Slow down. Breathe. Repeat.',
  'You are braver than you think.',
  'Act now. Think less.',
  'Enjoy the little moments.',
  'Focus on the good.',
  'Choose joy.',
]

export function getRandomText(): string {
  const allTexts = [...CHINESE_TEXTS, ...ENGLISH_TEXTS]
  const index = Math.floor(Math.random() * allTexts.length)
  return allTexts[index]
}

export const SAMPLE_TEXT = getRandomText()
