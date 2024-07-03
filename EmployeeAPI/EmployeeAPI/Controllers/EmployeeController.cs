using EmployeeAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }


        [HttpGet("all")]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            /*
            var employees = new List<Employee>
            {
                new Employee
                {
                    FirstName = "Test",
                    LastName = "Test",
                    Email = "Test",
                    Phone = "Test"
                }
            };
            return Ok(employees);
            */

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPost("add")]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut("update")]
        public async Task<ActionResult<Employee>> UpdateEmployee(Employee employee)
        {
            var dbEmployee = await _context.Employees.FindAsync(employee.Id);
            if (dbEmployee == null)
            {
                   return BadRequest("Employee does not exist.");
            }
            dbEmployee.FirstName = employee.FirstName;
            dbEmployee.LastName = employee.LastName;
            dbEmployee.Email = employee.Email;
            dbEmployee.Phone = employee.Phone;

            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var dbEmployee = await _context.Employees.FindAsync(id);
            if (dbEmployee == null)
            {
                return BadRequest("Employee does not exist.");
            }
            _context.Employees.Remove(dbEmployee);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }
    }
}
