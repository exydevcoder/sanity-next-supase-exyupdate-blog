import { defineField, defineType } from 'sanity';

export const adverts = defineType({
  name: 'adverts',
  title: 'Adverts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ad Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'advertiser',
      title: 'Advertiser/Company',
      type: 'string',
      validation: Rule => Rule.required()
    }),
     defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Add tags to categorize this advertisement'
    }),
    defineField({
      name: 'adType',
      title: 'Advertisement Type',
      type: 'string',
      options: {
        list: [
          { title: 'Banner', value: 'banner' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'In-content', value: 'in-content' },
          { title: 'Sponsored Post', value: 'sponsored-post' },
          { title: 'Pop-up', value: 'popup' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'sidebar',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers will be shown first (1-30)',
      validation: Rule => Rule.required().min(1).max(30),
      initialValue: 5
    }),
    defineField({
      name: 'image',
      title: 'Ad Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for the image (for accessibility)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the advertisement'
    }),
    defineField({
      name: 'clickUrl',
      title: 'Click URL',
      type: 'url',
      description: 'Where users will be redirected when they click the ad',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https']
        })
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: true,
      description: 'Whether the link should open in a new tab'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this advertisement is currently active'
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When this advertisement should start showing',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When this advertisement should stop showing',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'number',
      description: 'Advertisement budget (optional)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      advertiser: 'advertiser',
      media: 'image',
      isActive: 'isActive',
      adType: 'adType'
    },
    prepare(selection) {
      const { advertiser, isActive, adType } = selection;
      const status = isActive ? '🟢' : '🔴';
      return {
        ...selection,
        subtitle: `${status} ${advertiser} • ${adType}`,
        description: isActive ? 'Active' : 'Inactive'
      };
    }
  },
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }]
    },
    {
      title: 'Start Date (Newest first)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }]
    },
    {
      title: 'Advertiser A-Z',
      name: 'advertiserAsc',
      by: [{ field: 'advertiser', direction: 'asc' }]
    }
  ]
});
