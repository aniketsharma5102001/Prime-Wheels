import React from 'react'

function InfoSection() {
  return (
 <section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
      <div class="md:col-span-3">
        <img
          src="https://www.hdcarwallpapers.com/walls/2015_mercedes_amg_gt_s_uk_spec-HD.jpg"
          class="rounded"
          alt=""
        />
      </div>

      <div class="md:col-span-1">
        <div class="max-w-lg md:max-w-none">
          <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Prime Wheels Your trusted platform to buy, sell, or list cars
          </h2>

          <p class="mt-4 text-gray-700">
           Prime Wheels is your trusted online destination for buying, selling, and listing cars. Whether you're searching for a brand-new model or a reliable pre-owned vehicle, we connect you with verified sellers across the country. List your car with ease and reach thousands of potential buyers. At Prime Wheels, we ensure a secure, transparent, and hassle-free car trading experience for everyone.


          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default InfoSection;